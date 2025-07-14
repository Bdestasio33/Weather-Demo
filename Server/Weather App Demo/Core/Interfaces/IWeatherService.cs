using Weather_App_Demo.Core.Models;

namespace Weather_App_Demo.Core.Interfaces;

/// <summary>
/// Interface for weather service operations
/// </summary>
public interface IWeatherService
{
    /// <summary>
    /// Gets current weather data for the specified location
    /// </summary>
    /// <param name="clientIp">Client IP address for location detection</param>
    /// <returns>Current weather information</returns>
    Task<CurrentWeather> GetCurrentWeatherAsync(string? clientIp = null);

    /// <summary>
    /// Gets current weather data for the specified city, state, and country
    /// </summary>
    /// <param name="city">City name</param>
    /// <param name="state">State or region name</param>
    /// <param name="country">Country code</param>
    /// <returns>Current weather information</returns>
    Task<CurrentWeather> GetCurrentWeatherByCityAsync(string city, string? state = null, string country = "US");

    /// <summary>
    /// Gets weather forecast data for the specified location
    /// </summary>
    /// <param name="clientIp">Client IP address for location detection</param>
    /// <returns>Weather forecast information</returns>
    Task<List<WeatherForecast>> GetWeatherForecastAsync(string? clientIp = null);

    /// <summary>
    /// Gets weather forecast data for the specified city, state, and country
    /// </summary>
    /// <param name="city">City name</param>
    /// <param name="state">State or region name</param>
    /// <param name="country">Country code</param>
    /// <returns>Weather forecast information</returns>
    Task<List<WeatherForecast>> GetWeatherForecastByCityAsync(string city, string? state = null, string country = "US");

    /// <summary>
    /// Gets weather alerts for the specified location
    /// </summary>
    /// <param name="clientIp">Client IP address for location detection</param>
    /// <returns>Weather alerts information</returns>
    Task<List<WeatherAlert>> GetWeatherAlertsAsync(string? clientIp = null);

    /// <summary>
    /// Gets weather alerts for the specified city, state, and country
    /// </summary>
    /// <param name="city">City name</param>
    /// <param name="state">State or region name</param>
    /// <param name="country">Country code</param>
    /// <returns>Weather alerts information</returns>
    Task<List<WeatherAlert>> GetWeatherAlertsByCityAsync(string city, string? state = null, string country = "US");
}