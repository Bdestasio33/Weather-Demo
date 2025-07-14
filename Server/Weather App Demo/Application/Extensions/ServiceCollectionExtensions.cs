using Weather_App_Demo.Core.Interfaces;
using Weather_App_Demo.Core.Services;

namespace Weather_App_Demo.Application.Extensions;

/// <summary>
/// Extension methods for service collection configuration
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Adds weather-related services to the service collection
    /// </summary>
    /// <param name="services">The service collection</param>
    /// <returns>The service collection for chaining</returns>
    public static IServiceCollection AddWeatherServices(this IServiceCollection services)
    {
        // Add HttpClient for weather service
        services.AddHttpClient<IWeatherService, WeatherService>(client =>
        {
            client.Timeout = TimeSpan.FromSeconds(30);
            client.DefaultRequestHeaders.Add("User-Agent", "WeatherApp/1.0");
        });

        return services;
    }

    /// <summary>
    /// Adds caching services to the service collection
    /// </summary>
    /// <param name="services">The service collection</param>
    /// <returns>The service collection for chaining</returns>
    public static IServiceCollection AddCachingServices(this IServiceCollection services)
    {
        services.AddMemoryCache(options =>
        {
            options.SizeLimit = 1000; // Limit cache size
        });

        return services;
    }

    /// <summary>
    /// Adds and configures CORS policies for the application
    /// </summary>
    /// <param name="services">The service collection</param>
    /// <returns>The service collection for chaining</returns>
    public static IServiceCollection AddWeatherCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp", policy =>
            {
                policy.WithOrigins("http://localhost:5173") // Vite default port
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials(); // Enable credentials for better client support
            });

            // Add a more permissive policy for development
            options.AddPolicy("DevelopmentPolicy", policy =>
            {
                policy.SetIsOriginAllowed(_ => true)
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials();
            });
        });

        return services;
    }

    /// <summary>
    /// Adds and configures Swagger/OpenAPI documentation
    /// </summary>
    /// <param name="services">The service collection</param>
    /// <returns>The service collection for chaining</returns>
    public static IServiceCollection AddWeatherDocumentation(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
            {
                Title = "Weather API",
                Version = "v1",
                Description = "A comprehensive weather API providing current conditions, forecasts, and alerts",
                Contact = new Microsoft.OpenApi.Models.OpenApiContact
                {
                    Name = "Weather API Support",
                    Email = "support@weatherapi.com"
                }
            });

            // Enable XML comments if available
            var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            if (File.Exists(xmlPath))
            {
                options.IncludeXmlComments(xmlPath);
            }
        });

        return services;
    }

    /// <summary>
    /// Adds controller services with JSON configuration
    /// </summary>
    /// <param name="services">The service collection</param>
    /// <returns>The service collection for chaining</returns>
    public static IServiceCollection AddWeatherControllers(this IServiceCollection services)
    {
        services.AddControllers()
            .ConfigureApiBehaviorOptions(options =>
            {
                // Customize API behavior
                options.SuppressMapClientErrors = true;
            })
            .AddJsonOptions(options =>
            {
                // Configure JSON serialization
                options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
                options.JsonSerializerOptions.WriteIndented = true;
            });

        return services;
    }
}