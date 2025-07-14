namespace Weather_App_Demo.Core.Models;

/// <summary>
/// Represents current weather conditions for a location
/// </summary>
public class CurrentWeather
{
    public string Location { get; set; } = string.Empty;
    public int Temperature { get; set; }
    public int TemperatureF { get; set; }
    public string Condition { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public int Humidity { get; set; }
    public int WindSpeed { get; set; }
    public DateTime Timestamp { get; set; }

    /// <summary>
    /// Indicates if the weather data is recent (within last hour)
    /// </summary>
    public bool IsRecent => DateTime.Now.Subtract(Timestamp).TotalHours < 1;

    /// <summary>
    /// Gets a comfort level description based on temperature
    /// </summary>
    public string ComfortLevel => Temperature switch
    {
        < 0 => "Very Cold",
        >= 0 and < 10 => "Cold",
        >= 10 and < 20 => "Cool",
        >= 20 and < 25 => "Comfortable",
        >= 25 and < 30 => "Warm",
        >= 30 => "Hot"
    };
}

/// <summary>
/// Represents weather forecast data for a specific date
/// </summary>
public record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary, string Condition)
{
    /// <summary>
    /// Temperature in Fahrenheit
    /// </summary>
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    /// <summary>
    /// Indicates if this forecast is for today
    /// </summary>
    public bool IsToday => Date == DateOnly.FromDateTime(DateTime.Now);

    /// <summary>
    /// Gets the day of week for this forecast
    /// </summary>
    public string DayOfWeek => Date.DayOfWeek.ToString();

    /// <summary>
    /// Gets the number of days from today
    /// </summary>
    public int DaysFromToday => Date.DayNumber - DateOnly.FromDateTime(DateTime.Now).DayNumber;
}

/// <summary>
/// Represents a weather alert or warning
/// </summary>
public class WeatherAlert
{
    public string Type { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public int Severity { get; set; }
    public DateTime ExpiresAt { get; set; }

    /// <summary>
    /// Human-readable severity level
    /// </summary>
    public string SeverityText => Severity switch
    {
        1 => "Low",
        2 => "Medium",
        3 => "High",
        _ => "Unknown"
    };

    /// <summary>
    /// Indicates if this alert is currently active
    /// </summary>
    public bool IsActive => DateTime.Now < ExpiresAt;

    /// <summary>
    /// Gets the time remaining until expiration
    /// </summary>
    public TimeSpan TimeUntilExpiration => ExpiresAt.Subtract(DateTime.Now);

    /// <summary>
    /// Gets a CSS class name based on severity level
    /// </summary>
    public string SeverityCssClass => Severity switch
    {
        1 => "alert-success",
        2 => "alert-warning",
        3 => "alert-danger",
        _ => "alert-info"
    };
}