using Microsoft.AspNetCore.Mvc;
using Weather_App_Demo.Core.Interfaces;
using Weather_App_Demo.Core.Models;
using Weather_App_Demo.Application.DTOs;

namespace Weather_App_Demo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;
    private readonly ILogger<WeatherController> _logger;
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;

    public WeatherController(IWeatherService weatherService, ILogger<WeatherController> logger, IConfiguration configuration, HttpClient httpClient)
    {
        _weatherService = weatherService;
        _logger = logger;
        _configuration = configuration;
        _httpClient = httpClient;
    }

    /// <summary>
    /// Gets current weather conditions for a specified location
    /// </summary>
    /// <param name="city">City name (required)</param>
    /// <param name="state">State/region name (optional)</param>
    /// <param name="country">Country code (defaults to US)</param>
    /// <returns>Current weather data</returns>
    [HttpGet("current")]
    [ProducesResponseType(typeof(CurrentWeatherDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<CurrentWeatherDto>> GetCurrentWeather(
        [FromQuery] string city,
        [FromQuery] string? state = null,
        [FromQuery] string? country = "US")
    {
        if (string.IsNullOrWhiteSpace(city))
        {
            return BadRequest("City parameter is required");
        }

        try
        {
            var locationInfo = $"{city}, {state}, {country}";
            _logger.LogInformation("Getting current weather for location: {LocationInfo}", locationInfo);

            var weather = await _weatherService.GetCurrentWeatherByCityAsync(city, state, country);

            var dto = new CurrentWeatherDto
            {
                Location = weather.Location,
                Temperature = weather.Temperature,
                TemperatureF = weather.TemperatureF,
                Condition = weather.Condition,
                Summary = weather.Summary,
                Humidity = weather.Humidity,
                WindSpeed = weather.WindSpeed,
                Timestamp = weather.Timestamp
            };

            return Ok(dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving current weather for {City}, {State}, {Country}", city, state, country);
            return StatusCode(500, "An error occurred while retrieving weather data");
        }
    }

    /// <summary>
    /// Gets 5-day weather forecast for a specified location
    /// </summary>
    /// <param name="city">City name (required)</param>
    /// <param name="state">State/region name (optional)</param>
    /// <param name="country">Country code (defaults to US)</param>
    /// <returns>Weather forecast data</returns>
    [HttpGet("forecast")]
    [ProducesResponseType(typeof(List<WeatherForecastDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<List<WeatherForecastDto>>> GetWeatherForecast(
        [FromQuery] string city,
        [FromQuery] string? state = null,
        [FromQuery] string? country = "US")
    {
        if (string.IsNullOrWhiteSpace(city))
        {
            return BadRequest("City parameter is required");
        }

        try
        {
            var locationInfo = $"{city}, {state}, {country}";
            _logger.LogInformation("Getting weather forecast for location: {LocationInfo}", locationInfo);

            var forecast = await _weatherService.GetWeatherForecastByCityAsync(city, state, country);

            var dtos = forecast.Select(f => new WeatherForecastDto
            {
                Date = f.Date,
                TemperatureC = f.TemperatureC,
                TemperatureF = f.TemperatureF,
                Summary = f.Summary,
                Condition = f.Condition
            }).ToList();

            return Ok(dtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving weather forecast for {City}, {State}, {Country}", city, state, country);
            return StatusCode(500, "An error occurred while retrieving forecast data");
        }
    }

    /// <summary>
    /// Gets active weather alerts for a specified location
    /// </summary>
    /// <param name="city">City name (required)</param>
    /// <param name="state">State/region name (optional)</param>
    /// <param name="country">Country code (defaults to US)</param>
    /// <returns>Weather alerts data</returns>
    [HttpGet("alerts")]
    [ProducesResponseType(typeof(List<WeatherAlertDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<List<WeatherAlertDto>>> GetWeatherAlerts(
        [FromQuery] string city,
        [FromQuery] string? state = null,
        [FromQuery] string? country = "US")
    {
        if (string.IsNullOrWhiteSpace(city))
        {
            return BadRequest("City parameter is required");
        }

        try
        {
            var locationInfo = $"{city}, {state}, {country}";
            _logger.LogInformation("Getting weather alerts for location: {LocationInfo}", locationInfo);

            var alerts = await _weatherService.GetWeatherAlertsByCityAsync(city, state, country);

            var dtos = alerts.Select(a => new WeatherAlertDto
            {
                Type = a.Type,
                Message = a.Message,
                Severity = a.Severity,
                ExpiresAt = a.ExpiresAt
            }).ToList();

            return Ok(dtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving weather alerts for {City}, {State}, {Country}", city, state, country);
            return StatusCode(500, "An error occurred while retrieving alerts data");
        }
    }

    /// <summary>
    /// Tests the OpenWeatherMap One Call API 3.0 configuration and connectivity
    /// </summary>
    /// <returns>API key status and connectivity test result</returns>
    [HttpGet("test")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> TestApiConfiguration()
    {
        try
        {
            var apiKey = _configuration["OpenWeatherMap:ApiKey"] ?? "demo_key";

            if (apiKey == "demo_key" || apiKey == "your_openweathermap_api_key_here")
            {
                return Ok(new
                {
                    Status = "Error",
                    Message = "OpenWeatherMap API key is not configured. Please set a valid API key in appsettings.json",
                    ApiKey = "Not configured",
                    Instructions = "Get a free API key from https://openweathermap.org/api and ensure One Call API 3.0 is enabled",
                    RequiredSubscription = "One Call API 3.0 (free tier: 1,000 calls/day)"
                });
            }

            // Test One Call API 3.0 with NYC coordinates
            var testUrl = $"https://api.openweathermap.org/data/3.0/onecall?lat=40.7128&lon=-74.0060&appid={apiKey}&exclude=minutely";
            var response = await _httpClient.GetAsync(testUrl);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                return Ok(new
                {
                    Status = "Success",
                    Message = "OpenWeatherMap One Call API 3.0 is working correctly",
                    ApiKey = $"{apiKey.Substring(0, Math.Min(8, apiKey.Length))}...",
                    TestLocation = "New York City",
                    ApiVersion = "One Call API 3.0",
                    ResponseSize = content.Length
                });
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();

                string errorMessage = response.StatusCode switch
                {
                    System.Net.HttpStatusCode.Unauthorized => "Invalid API key or One Call API 3.0 not subscribed",
                    System.Net.HttpStatusCode.Forbidden => "One Call API 3.0 subscription required",
                    _ => $"API request failed: {response.StatusCode}"
                };

                return Ok(new
                {
                    Status = "Error",
                    Message = errorMessage,
                    ApiKey = $"{apiKey.Substring(0, Math.Min(8, apiKey.Length))}...",
                    Instructions = "Ensure you have subscribed to One Call API 3.0 at https://openweathermap.org/api/one-call-3",
                    ErrorDetails = errorContent
                });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error testing API configuration");
            return StatusCode(500, new
            {
                Status = "Error",
                Message = "Failed to test API configuration",
                ErrorDetails = ex.Message
            });
        }
    }
}