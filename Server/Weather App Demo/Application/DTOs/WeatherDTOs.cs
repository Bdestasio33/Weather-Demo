namespace Weather_App_Demo.Application.DTOs;

/// <summary>
/// Data transfer object for current weather information
/// </summary>
public class CurrentWeatherDto
{
    public string Location { get; set; } = string.Empty;
    public int Temperature { get; set; }
    public int TemperatureF { get; set; }
    public string Condition { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public int Humidity { get; set; }
    public int WindSpeed { get; set; }
    public DateTime Timestamp { get; set; }
}

/// <summary>
/// Data transfer object for weather forecast information
/// </summary>
public class WeatherForecastDto
{
    public DateOnly Date { get; set; }
    public int TemperatureC { get; set; }
    public int TemperatureF { get; set; }
    public string? Summary { get; set; }
    public string Condition { get; set; } = string.Empty;
}

/// <summary>
/// Data transfer object for weather alert information
/// </summary>
public class WeatherAlertDto
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
}