namespace Weather_App_Demo.Application.Configuration;

/// <summary>
/// Configuration options for OpenWeatherMap API
/// </summary>
public class OpenWeatherMapOptions
{
    public const string SectionName = "OpenWeatherMap";

    /// <summary>
    /// API key for OpenWeatherMap service
    /// </summary>
    public string ApiKey { get; set; } = string.Empty;

    /// <summary>
    /// Base URL for OpenWeatherMap API
    /// </summary>
    public string BaseUrl { get; set; } = "https://api.openweathermap.org/data/2.5";

    /// <summary>
    /// Timeout for API requests in seconds
    /// </summary>
    public int TimeoutSeconds { get; set; } = 30;

    /// <summary>
    /// Validates that required settings are configured
    /// </summary>
    public bool IsValid => !string.IsNullOrEmpty(ApiKey) && ApiKey != "your_openweathermap_api_key_here";
}

/// <summary>
/// Configuration options for caching behavior
/// </summary>
public class CacheOptions
{
    public const string SectionName = "Cache";

    /// <summary>
    /// Cache duration in minutes for weather data
    /// </summary>
    public int WeatherCacheDurationMinutes { get; set; } = 30;

    /// <summary>
    /// Cache duration in minutes for location data
    /// </summary>
    public int LocationCacheDurationMinutes { get; set; } = 60;

    /// <summary>
    /// Maximum number of items in memory cache
    /// </summary>
    public int MaxCacheSize { get; set; } = 1000;

    /// <summary>
    /// Whether to enable cache compression
    /// </summary>
    public bool EnableCompression { get; set; } = false;
}

/// <summary>
/// Configuration options for location services
/// </summary>
public class LocationOptions
{
    public const string SectionName = "Location";

    /// <summary>
    /// Base URL for IP-API service
    /// </summary>
    public string IpApiBaseUrl { get; set; } = "http://ip-api.com/json";

    /// <summary>
    /// Default location when IP geolocation fails
    /// </summary>
    public DefaultLocation DefaultLocation { get; set; } = new()
    {
        City = "New York",
        Country = "US",
        Latitude = 40.7128,
        Longitude = -74.0060
    };

    /// <summary>
    /// Timeout for location API requests in seconds
    /// </summary>
    public int TimeoutSeconds { get; set; } = 10;
}

/// <summary>
/// Default location settings
/// </summary>
public class DefaultLocation
{
    public string City { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}