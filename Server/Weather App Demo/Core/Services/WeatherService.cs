using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;
using Weather_App_Demo.Core.Interfaces;
using Weather_App_Demo.Core.Models;
using Weather_App_Demo.Infrastructure.External;

namespace Weather_App_Demo.Core.Services;

/// <summary>
/// Core weather service implementation using OpenWeatherMap One Call API 3.0
/// </summary>
public class WeatherService : IWeatherService
{
    private readonly HttpClient _httpClient;
    private readonly IMemoryCache _cache;
    private readonly ILogger<WeatherService> _logger;
    private readonly IConfiguration _configuration;

    // Cache keys
    private const string WEATHER_DATA_CACHE_KEY = "weather_data_{0}";
    private const string GEOCODING_CACHE_KEY = "geocoding_{0}";

    // Cache duration and options
    private static readonly TimeSpan WeatherCacheDuration = TimeSpan.FromMinutes(30);
    private static readonly TimeSpan GeocodingCacheDuration = TimeSpan.FromHours(24); // Geocoding results can be cached longer

    private static readonly MemoryCacheEntryOptions WeatherCacheOptions = new()
    {
        AbsoluteExpirationRelativeToNow = WeatherCacheDuration,
        Size = 1
    };

    private static readonly MemoryCacheEntryOptions GeocodingCacheOptions = new()
    {
        AbsoluteExpirationRelativeToNow = GeocodingCacheDuration,
        Size = 1
    };

    public WeatherService(HttpClient httpClient, IMemoryCache cache, ILogger<WeatherService> logger, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _cache = cache;
        _logger = logger;
        _configuration = configuration;
    }

    public async Task<CurrentWeather> GetCurrentWeatherAsync(string? clientIp = null)
    {
        // For backwards compatibility, default to New York when no specific location is provided
        return await GetCurrentWeatherByCityAsync("New York", "New York", "US");
    }

    public async Task<CurrentWeather> GetCurrentWeatherByCityAsync(string city, string? state = null, string country = "US")
    {
        try
        {
            // Get coordinates for the city
            var (lat, lon, locationName) = await GetCoordinatesByCityAsync(city, state, country);

            // Get weather data from One Call API 3.0
            var weatherData = await GetWeatherDataAsync(lat, lon);

            var currentWeather = new CurrentWeather
            {
                Location = locationName,
                Temperature = (int)Math.Round(weatherData.Current.Temp - 273.15), // Convert from Kelvin to Celsius
                TemperatureF = (int)Math.Round((weatherData.Current.Temp - 273.15) * 9 / 5 + 32), // Convert to Fahrenheit
                Condition = weatherData.Current.Weather.FirstOrDefault()?.Main ?? "Unknown",
                Summary = CapitalizeFirstLetter(weatherData.Current.Weather.FirstOrDefault()?.Description ?? "No description"),
                Humidity = weatherData.Current.Humidity,
                WindSpeed = (int)Math.Round(weatherData.Current.WindSpeed * 3.6), // Convert m/s to km/h
                Timestamp = DateTime.Now
            };

            return currentWeather;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to get current weather for {City}, {State}, {Country}", city, state, country);
            return GetFallbackCurrentWeather(city, state, country);
        }
    }

    public async Task<List<WeatherForecast>> GetWeatherForecastAsync(string? clientIp = null)
    {
        // For backwards compatibility, default to New York when no specific location is provided
        return await GetWeatherForecastByCityAsync("New York", "New York", "US");
    }

    public async Task<List<WeatherForecast>> GetWeatherForecastByCityAsync(string city, string? state = null, string country = "US")
    {
        try
        {
            // Get coordinates for the city
            var (lat, lon, locationName) = await GetCoordinatesByCityAsync(city, state, country);

            // Get weather data from One Call API 3.0
            var weatherData = await GetWeatherDataAsync(lat, lon);

            // Convert daily forecast data (next 7 days available, take first 5)
            var dailyForecasts = weatherData.Daily
                .Take(5)
                .Select(day => new WeatherForecast(
                    DateOnly.FromDateTime(DateTimeOffset.FromUnixTimeSeconds(day.Dt).DateTime),
                    (int)Math.Round(day.Temp.Day - 273.15), // Convert from Kelvin to Celsius
                    CapitalizeFirstLetter(day.Weather.FirstOrDefault()?.Description ?? "No description"),
                    day.Weather.FirstOrDefault()?.Main ?? "Unknown"
                ))
                .ToList();

            return dailyForecasts;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to get weather forecast for {City}, {State}, {Country}", city, state, country);
            return GetFallbackForecast();
        }
    }

    public async Task<List<WeatherAlert>> GetWeatherAlertsAsync(string? clientIp = null)
    {
        // For backwards compatibility, default to New York when no specific location is provided
        return await GetWeatherAlertsByCityAsync("New York", "New York", "US");
    }

    public async Task<List<WeatherAlert>> GetWeatherAlertsByCityAsync(string city, string? state = null, string country = "US")
    {
        try
        {
            // Get coordinates for the city
            var (lat, lon, locationName) = await GetCoordinatesByCityAsync(city, state, country);

            // Get weather data from One Call API 3.0
            var weatherData = await GetWeatherDataAsync(lat, lon);

            // Convert alert data if available
            if (weatherData.Alerts?.Count > 0)
            {
                var alerts = weatherData.Alerts
                    .Select(alert => new WeatherAlert
                    {
                        Type = alert.Event,
                        Message = alert.Description,
                        Severity = DetermineSeverity(alert.Event), // Custom method to determine severity
                        ExpiresAt = DateTimeOffset.FromUnixTimeSeconds(alert.End).DateTime
                    })
                    .ToList();

                return alerts;
            }

            return new List<WeatherAlert>();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to get weather alerts for {City}, {State}, {Country}", city, state, country);
            return new List<WeatherAlert>();
        }
    }

    #region Private Methods

    /// <summary>
    /// Gets comprehensive weather data from OpenWeatherMap One Call API 3.0
    /// </summary>
    private async Task<OneCallResponse> GetWeatherDataAsync(double lat, double lon)
    {
        var locationKey = $"{lat:F4},{lon:F4}";
        var cacheKey = string.Format(WEATHER_DATA_CACHE_KEY, locationKey);

        // Try to get from cache first
        if (_cache.TryGetValue(cacheKey, out OneCallResponse? cachedData))
        {
            _logger.LogInformation("Retrieved weather data from cache for {LocationKey}", locationKey);
            return cachedData!;
        }

        var apiKey = _configuration["OpenWeatherMap:ApiKey"] ?? "demo_key";

        if (apiKey == "demo_key" || apiKey == "your_openweathermap_api_key_here")
        {
            _logger.LogError("OpenWeatherMap API key is not configured. Please set a valid API key in appsettings.json");
            throw new InvalidOperationException("OpenWeatherMap API key is not configured");
        }

        // One Call API 3.0 endpoint
        var url = $"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={apiKey}&exclude=minutely";

        try
        {
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError("OpenWeatherMap One Call API request failed with status {StatusCode}: {ErrorContent}",
                    response.StatusCode, errorContent);

                if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    throw new UnauthorizedAccessException("Invalid OpenWeatherMap API key or One Call API 3.0 not subscribed");
                }

                response.EnsureSuccessStatusCode();
            }

            var jsonContent = await response.Content.ReadAsStringAsync();
            var weatherData = JsonSerializer.Deserialize<OneCallResponse>(jsonContent);

            if (weatherData == null)
            {
                throw new InvalidOperationException("Failed to deserialize weather data");
            }

            // Cache the result
            _cache.Set(cacheKey, weatherData, WeatherCacheOptions);
            _logger.LogInformation("Cached weather data for {LocationKey}", locationKey);

            return weatherData;
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Network error when calling OpenWeatherMap One Call API");
            throw;
        }
        catch (TaskCanceledException ex)
        {
            _logger.LogError(ex, "Timeout when calling OpenWeatherMap One Call API");
            throw;
        }
    }

    /// <summary>
    /// Gets coordinates for a city using OpenWeatherMap's Geocoding API
    /// </summary>
    private async Task<(double lat, double lon, string name)> GetCoordinatesByCityAsync(string city, string? state, string country)
    {
        var locationKey = $"{city},{state},{country}";
        var cacheKey = string.Format(GEOCODING_CACHE_KEY, locationKey);

        // Try to get from cache first
        if (_cache.TryGetValue(cacheKey, out (double lat, double lon, string name)? cachedCoords))
        {
            _logger.LogInformation("Retrieved coordinates from cache for {LocationKey}", locationKey);
            return cachedCoords!.Value;
        }

        try
        {
            var apiKey = _configuration["OpenWeatherMap:ApiKey"] ?? "demo_key";
            if (apiKey == "demo_key" || apiKey == "your_openweathermap_api_key_here")
            {
                _logger.LogWarning("Using demo API key, returning default coordinates for {City}", city);
                return (40.7128, -74.0060, $"{city}, {state}, {country}"); // Default to NYC
            }

            // Build the query string
            var query = string.IsNullOrEmpty(state)
                ? $"{city},{country}"
                : $"{city},{state},{country}";

            var url = $"http://api.openweathermap.org/geo/1.0/direct?q={Uri.EscapeDataString(query)}&limit=1&appid={apiKey}";

            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var jsonContent = await response.Content.ReadAsStringAsync();
            var geocodeResults = JsonSerializer.Deserialize<List<GeocodeResult>>(jsonContent);

            if (geocodeResults?.Count > 0)
            {
                var result = geocodeResults[0];
                var displayName = string.IsNullOrEmpty(result.State)
                    ? $"{result.Name}, {result.Country}"
                    : $"{result.Name}, {result.State}, {result.Country}";

                var coordinates = (result.Lat, result.Lon, displayName);

                // Cache the result
                _cache.Set(cacheKey, coordinates, GeocodingCacheOptions);
                _logger.LogInformation("Successfully geocoded {Query} to {Lat}, {Lon}", query, result.Lat, result.Lon);

                return coordinates;
            }
            else
            {
                _logger.LogWarning("No geocoding results found for {Query}", query);
                return (40.7128, -74.0060, $"{city}, {state}, {country}"); // Default to NYC
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to geocode city {City}, {State}, {Country}", city, state, country);
            return (40.7128, -74.0060, $"{city}, {state}, {country}"); // Default to NYC
        }
    }

    /// <summary>
    /// Determines alert severity based on event type
    /// </summary>
    private static int DetermineSeverity(string eventType)
    {
        return eventType.ToLower() switch
        {
            var e when e.Contains("tornado") || e.Contains("hurricane") => 3,
            var e when e.Contains("severe") || e.Contains("warning") => 2,
            _ => 1
        };
    }

    private static string CapitalizeFirstLetter(string input)
    {
        if (string.IsNullOrEmpty(input))
            return input;

        return char.ToUpper(input[0]) + input[1..];
    }

    private CurrentWeather GetFallbackCurrentWeather(string city, string? state, string country)
    {
        _logger.LogWarning("Using fallback current weather data for {City}, {State}, {Country} - check OpenWeatherMap API key configuration", city, state, country);

        var random = new Random();
        var conditions = new[] { "Clear", "Partly Cloudy", "Cloudy", "Overcast", "Light Rain", "Rain" };
        var summaries = new[] { "Clear", "Partly cloudy", "Cloudy", "Overcast", "Light rain", "Rain" };

        // Generate realistic temperature for current season
        var baseTemp = DateTime.Now.Month switch
        {
            12 or 1 or 2 => random.Next(-5, 8),    // Winter
            3 or 4 or 5 => random.Next(8, 20),     // Spring  
            6 or 7 or 8 => random.Next(18, 32),    // Summer
            9 or 10 or 11 => random.Next(5, 18),   // Fall
            _ => random.Next(10, 25)
        };

        var temperature = Math.Max(-20, Math.Min(40, baseTemp + random.Next(-3, 4)));

        return new CurrentWeather
        {
            Location = $"{city}, {state}, {country}",
            Temperature = temperature,
            TemperatureF = 32 + (int)(temperature * 9.0 / 5.0),
            Condition = conditions[random.Next(conditions.Length)],
            Summary = summaries[random.Next(summaries.Length)],
            Humidity = random.Next(40, 80),
            WindSpeed = random.Next(0, 15),
            Timestamp = DateTime.Now
        };
    }

    private List<WeatherForecast> GetFallbackForecast()
    {
        _logger.LogWarning("Using fallback forecast data - check OpenWeatherMap API key configuration");

        var summaries = new[] { "Clear", "Partly cloudy", "Cloudy", "Overcast", "Light rain", "Rain", "Drizzle" };
        var conditions = new[] { "Clear", "Clouds", "Clouds", "Clouds", "Rain", "Rain", "Drizzle" };
        var random = new Random();

        return Enumerable.Range(1, 5).Select(index =>
        {
            // Generate realistic temperature for current season
            var baseTemp = DateTime.Now.Month switch
            {
                12 or 1 or 2 => random.Next(-5, 8),    // Winter
                3 or 4 or 5 => random.Next(8, 20),     // Spring  
                6 or 7 or 8 => random.Next(18, 32),    // Summer
                9 or 10 or 11 => random.Next(5, 18),   // Fall
                _ => random.Next(10, 25)
            };

            // Add small day-to-day variation
            var tempVariation = random.Next(-3, 4);
            var temperature = Math.Max(-20, Math.Min(45, baseTemp + tempVariation));

            return new WeatherForecast(
                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                temperature,
                summaries[random.Next(summaries.Length)],
                conditions[random.Next(conditions.Length)]
            );
        }).ToList();
    }

    #endregion
}