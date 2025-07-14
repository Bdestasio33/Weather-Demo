namespace Weather_App_Demo.Common.Constants;

/// <summary>
/// Constants used throughout the weather application
/// </summary>
public static class WeatherConstants
{
    /// <summary>
    /// Cache key constants
    /// </summary>
    public static class CacheKeys
    {
        public const string CurrentWeather = "current_weather_{0}";
        public const string Forecast = "forecast_{0}";
        public const string Alerts = "alerts_{0}";
        public const string Location = "location_{0}";
    }

    /// <summary>
    /// API endpoint constants
    /// </summary>
    public static class ApiEndpoints
    {
        public const string CurrentWeather = "/api/weather/current";
        public const string Forecast = "/api/weather/forecast";
        public const string Alerts = "/api/weather/alerts";
    }

    /// <summary>
    /// Weather condition constants
    /// </summary>
    public static class WeatherConditions
    {
        public static readonly string[] Sunny = { "Clear", "Sunny" };
        public static readonly string[] Cloudy = { "Clouds", "Partly Cloudy", "Cloudy", "Overcast" };
        public static readonly string[] Rainy = { "Rain", "Light Rain", "Heavy Rain", "Drizzle" };
        public static readonly string[] Stormy = { "Thunderstorm", "Storm" };
        public static readonly string[] Snowy = { "Snow", "Light Snow", "Heavy Snow" };
        public static readonly string[] Foggy = { "Fog", "Mist", "Haze" };
    }

    /// <summary>
    /// Temperature constants
    /// </summary>
    public static class Temperature
    {
        public const double KelvinToCelsiusOffset = 273.15;
        public const double CelsiusToFahrenheitMultiplier = 9.0 / 5.0;
        public const int FahrenheitOffset = 32;

        // Wind speed conversion (m/s to km/h)
        public const double MsToKmhMultiplier = 3.6;
    }

    /// <summary>
    /// HTTP client constants
    /// </summary>
    public static class HttpClient
    {
        public const string UserAgent = "WeatherApp/1.0";
        public const int DefaultTimeoutSeconds = 30;
        public const int LocationTimeoutSeconds = 10;
    }

    /// <summary>
    /// CORS policy names
    /// </summary>
    public static class CorsPolicies
    {
        public const string AllowReactApp = "AllowReactApp";
        public const string DevelopmentPolicy = "DevelopmentPolicy";
    }

    /// <summary>
    /// Configuration section names
    /// </summary>
    public static class ConfigSections
    {
        public const string OpenWeatherMap = "OpenWeatherMap";
        public const string Cache = "Cache";
        public const string Location = "Location";
    }

    /// <summary>
    /// Severity level constants for weather alerts
    /// </summary>
    public static class AlertSeverity
    {
        public const int Low = 1;
        public const int Medium = 2;
        public const int High = 3;

        public static readonly Dictionary<int, string> SeverityNames = new()
        {
            { Low, "Low" },
            { Medium, "Medium" },
            { High, "High" }
        };

        public static readonly Dictionary<int, string> SeverityCssClasses = new()
        {
            { Low, "alert-success" },
            { Medium, "alert-warning" },
            { High, "alert-danger" }
        };
    }

    /// <summary>
    /// Default values
    /// </summary>
    public static class Defaults
    {
        public const int CacheDurationMinutes = 30;
        public const int LocationCacheDurationMinutes = 60;
        public const int MaxCacheSize = 1000;

        // Default location (New York)
        public const string DefaultCity = "New York";
        public const string DefaultCountry = "US";
        public const double DefaultLatitude = 40.7128;
        public const double DefaultLongitude = -74.0060;
    }
}