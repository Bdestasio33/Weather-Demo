using System.Text.Json.Serialization;

namespace Weather_App_Demo.Infrastructure.External;

/// <summary>
/// Response model for OpenWeatherMap One Call API 3.0
/// </summary>
public class OneCallResponse
{
    [JsonPropertyName("lat")]
    public double Lat { get; set; }

    [JsonPropertyName("lon")]
    public double Lon { get; set; }

    [JsonPropertyName("timezone")]
    public string Timezone { get; set; } = string.Empty;

    [JsonPropertyName("timezone_offset")]
    public int TimezoneOffset { get; set; }

    [JsonPropertyName("current")]
    public CurrentWeatherData Current { get; set; } = new();

    [JsonPropertyName("hourly")]
    public List<HourlyWeatherData> Hourly { get; set; } = new();

    [JsonPropertyName("daily")]
    public List<DailyWeatherData> Daily { get; set; } = new();

    [JsonPropertyName("alerts")]
    public List<WeatherAlertData>? Alerts { get; set; }
}

/// <summary>
/// Current weather data from One Call API 3.0
/// </summary>
public class CurrentWeatherData
{
    [JsonPropertyName("dt")]
    public long Dt { get; set; }

    [JsonPropertyName("sunrise")]
    public long Sunrise { get; set; }

    [JsonPropertyName("sunset")]
    public long Sunset { get; set; }

    [JsonPropertyName("temp")]
    public double Temp { get; set; }

    [JsonPropertyName("feels_like")]
    public double FeelsLike { get; set; }

    [JsonPropertyName("pressure")]
    public int Pressure { get; set; }

    [JsonPropertyName("humidity")]
    public int Humidity { get; set; }

    [JsonPropertyName("dew_point")]
    public double DewPoint { get; set; }

    [JsonPropertyName("uvi")]
    public double Uvi { get; set; }

    [JsonPropertyName("clouds")]
    public int Clouds { get; set; }

    [JsonPropertyName("visibility")]
    public int Visibility { get; set; }

    [JsonPropertyName("wind_speed")]
    public double WindSpeed { get; set; }

    [JsonPropertyName("wind_deg")]
    public int WindDeg { get; set; }

    [JsonPropertyName("wind_gust")]
    public double? WindGust { get; set; }

    [JsonPropertyName("weather")]
    public List<WeatherCondition> Weather { get; set; } = new();

    [JsonPropertyName("rain")]
    public PrecipitationData? Rain { get; set; }

    [JsonPropertyName("snow")]
    public PrecipitationData? Snow { get; set; }
}

/// <summary>
/// Hourly weather data from One Call API 3.0
/// </summary>
public class HourlyWeatherData
{
    [JsonPropertyName("dt")]
    public long Dt { get; set; }

    [JsonPropertyName("temp")]
    public double Temp { get; set; }

    [JsonPropertyName("feels_like")]
    public double FeelsLike { get; set; }

    [JsonPropertyName("pressure")]
    public int Pressure { get; set; }

    [JsonPropertyName("humidity")]
    public int Humidity { get; set; }

    [JsonPropertyName("dew_point")]
    public double DewPoint { get; set; }

    [JsonPropertyName("uvi")]
    public double Uvi { get; set; }

    [JsonPropertyName("clouds")]
    public int Clouds { get; set; }

    [JsonPropertyName("visibility")]
    public int Visibility { get; set; }

    [JsonPropertyName("wind_speed")]
    public double WindSpeed { get; set; }

    [JsonPropertyName("wind_deg")]
    public int WindDeg { get; set; }

    [JsonPropertyName("wind_gust")]
    public double? WindGust { get; set; }

    [JsonPropertyName("weather")]
    public List<WeatherCondition> Weather { get; set; } = new();

    [JsonPropertyName("pop")]
    public double Pop { get; set; }

    [JsonPropertyName("rain")]
    public PrecipitationData? Rain { get; set; }

    [JsonPropertyName("snow")]
    public PrecipitationData? Snow { get; set; }
}

/// <summary>
/// Daily weather data from One Call API 3.0
/// </summary>
public class DailyWeatherData
{
    [JsonPropertyName("dt")]
    public long Dt { get; set; }

    [JsonPropertyName("sunrise")]
    public long Sunrise { get; set; }

    [JsonPropertyName("sunset")]
    public long Sunset { get; set; }

    [JsonPropertyName("moonrise")]
    public long Moonrise { get; set; }

    [JsonPropertyName("moonset")]
    public long Moonset { get; set; }

    [JsonPropertyName("moon_phase")]
    public double MoonPhase { get; set; }

    [JsonPropertyName("summary")]
    public string Summary { get; set; } = string.Empty;

    [JsonPropertyName("temp")]
    public DailyTemperature Temp { get; set; } = new();

    [JsonPropertyName("feels_like")]
    public DailyFeelsLike FeelsLike { get; set; } = new();

    [JsonPropertyName("pressure")]
    public int Pressure { get; set; }

    [JsonPropertyName("humidity")]
    public int Humidity { get; set; }

    [JsonPropertyName("dew_point")]
    public double DewPoint { get; set; }

    [JsonPropertyName("wind_speed")]
    public double WindSpeed { get; set; }

    [JsonPropertyName("wind_deg")]
    public int WindDeg { get; set; }

    [JsonPropertyName("wind_gust")]
    public double? WindGust { get; set; }

    [JsonPropertyName("weather")]
    public List<WeatherCondition> Weather { get; set; } = new();

    [JsonPropertyName("clouds")]
    public int Clouds { get; set; }

    [JsonPropertyName("pop")]
    public double Pop { get; set; }

    [JsonPropertyName("rain")]
    public double? Rain { get; set; }

    [JsonPropertyName("snow")]
    public double? Snow { get; set; }

    [JsonPropertyName("uvi")]
    public double Uvi { get; set; }
}

/// <summary>
/// Daily temperature data from One Call API 3.0
/// </summary>
public class DailyTemperature
{
    [JsonPropertyName("day")]
    public double Day { get; set; }

    [JsonPropertyName("min")]
    public double Min { get; set; }

    [JsonPropertyName("max")]
    public double Max { get; set; }

    [JsonPropertyName("night")]
    public double Night { get; set; }

    [JsonPropertyName("eve")]
    public double Eve { get; set; }

    [JsonPropertyName("morn")]
    public double Morn { get; set; }
}

/// <summary>
/// Daily feels like temperature data from One Call API 3.0
/// </summary>
public class DailyFeelsLike
{
    [JsonPropertyName("day")]
    public double Day { get; set; }

    [JsonPropertyName("night")]
    public double Night { get; set; }

    [JsonPropertyName("eve")]
    public double Eve { get; set; }

    [JsonPropertyName("morn")]
    public double Morn { get; set; }
}

/// <summary>
/// Weather condition data from One Call API 3.0
/// </summary>
public class WeatherCondition
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("main")]
    public string Main { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;

    [JsonPropertyName("icon")]
    public string Icon { get; set; } = string.Empty;
}

/// <summary>
/// Precipitation data from One Call API 3.0
/// </summary>
public class PrecipitationData
{
    [JsonPropertyName("1h")]
    public double? OneHour { get; set; }
}

/// <summary>
/// Weather alert data from One Call API 3.0
/// </summary>
public class WeatherAlertData
{
    [JsonPropertyName("sender_name")]
    public string SenderName { get; set; } = string.Empty;

    [JsonPropertyName("event")]
    public string Event { get; set; } = string.Empty;

    [JsonPropertyName("start")]
    public long Start { get; set; }

    [JsonPropertyName("end")]
    public long End { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;

    [JsonPropertyName("tags")]
    public List<string> Tags { get; set; } = new();
}

/// <summary>
/// Response model for OpenWeatherMap Geocoding API
/// </summary>
public class GeocodeResult
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("local_names")]
    public Dictionary<string, string>? LocalNames { get; set; }

    [JsonPropertyName("lat")]
    public double Lat { get; set; }

    [JsonPropertyName("lon")]
    public double Lon { get; set; }

    [JsonPropertyName("country")]
    public string Country { get; set; } = string.Empty;

    [JsonPropertyName("state")]
    public string State { get; set; } = string.Empty;
}