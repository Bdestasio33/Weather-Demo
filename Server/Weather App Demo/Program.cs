using Weather_App_Demo.Application.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services using extension methods for better organization
builder.Services.AddWeatherControllers();
builder.Services.AddWeatherDocumentation();
builder.Services.AddWeatherCors();
builder.Services.AddCachingServices();
builder.Services.AddWeatherServices();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Weather API v1");
        options.RoutePrefix = "swagger"; // Swagger UI available at /swagger
    });

    // Use more permissive CORS in development
    app.UseCors("DevelopmentPolicy");
}
else
{
    // Use strict CORS in production
    app.UseCors("AllowReactApp");
}

app.UseHttpsRedirection();

// Serve static files if they exist
app.UseStaticFiles();

// Add a simple root endpoint (excluded from Swagger)
app.MapGet("/", () => Results.Content(@"
<!DOCTYPE html>
<html>
<head>
    <title>Weather API</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: linear-gradient(135deg, #74b9ff, #0984e3); color: white; }
        .container { max-width: 600px; margin: 0 auto; text-align: center; }
        .card { background: rgba(255,255,255,0.1); padding: 30px; border-radius: 10px; backdrop-filter: blur(10px); }
        a { color: #fff; text-decoration: none; background: rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 5px; margin: 10px; display: inline-block; }
        a:hover { background: rgba(255,255,255,0.3); }
    </style>
</head>
<body>
    <div class='container'>
        <div class='card'>
            <h1>🌤️ Weather API</h1>
            <p>A comprehensive weather API providing current conditions, forecasts, and alerts.</p>
            <div>
                <a href='/swagger'>📖 API Documentation</a>
                <a href='/api/weather/current'>🌡️ Current Weather</a>
                <a href='/api/weather/forecast'>📅 Forecast</a>
                <a href='/api/weather/alerts'>⚠️ Alerts</a>
            </div>
        </div>
    </div>
</body>
</html>", "text/html")).ExcludeFromDescription();

// Map controllers instead of minimal APIs
app.MapControllers();

app.Run();