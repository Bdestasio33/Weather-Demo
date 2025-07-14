# Weather API Server

**🚨 QUICK SETUP - Fix Inaccurate Weather Data**

Your weather data is showing random/inaccurate results because the OpenWeatherMap One Call API 3.0 is not configured. Follow these steps to get real weather data:

## ⚡ Quick Fix (3 minutes)

1. **Get a Free API Key**

   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Click "Sign Up" (it's free!)
   - After signing up, go to your [API Keys page](https://home.openweathermap.org/api_keys)
   - Copy your API key (it looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

2. **Subscribe to One Call API 3.0**

   - Go to [One Call API 3.0](https://openweathermap.org/api/one-call-3)
   - Click "Subscribe" and select the free tier (1,000 calls/day)
   - This step is required as One Call API 3.0 needs a separate subscription

3. **Configure the API Key**

   - Open `Server/Weather App Demo/appsettings.Development.json`
   - Replace `"your_openweathermap_api_key_here"` with your actual API key:

   ```json
   {
     "OpenWeatherMap": {
       "ApiKey": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
     }
   }
   ```

4. **Test the Configuration**

   - Restart your server: `dotnet run`
   - Test the API key: `GET http://localhost:5283/api/weather/test`
   - Should return `"Status": "Success"`

5. **Get Real Weather Data**
   - Test New Castle, PA: `GET http://localhost:5283/api/weather/current?city=New Castle&state=Pennsylvania&country=US`
   - Should now return actual weather data instead of random values

---

A .NET 8 Web API that provides comprehensive weather data using OpenWeatherMap One Call API 3.0 with intelligent caching to conserve API calls.

## 🌟 Features

- **Real Weather Data**: Integrates with OpenWeatherMap One Call API 3.0 for accurate weather information
- **Comprehensive Data**: Current weather, 5-day forecast, and weather alerts in a single API call
- **Smart Caching**: 30-minute cache for weather data, 24-hour cache for geocoding
- **City-Based Queries**: Clean API that works with city/state/country parameters
- **Fallback System**: Graceful degradation to demo data when APIs are unavailable
- **CORS Support**: Configured for React frontend integration

## 🔧 Setup

### 1. Get API Key and Subscribe to One Call API 3.0

#### OpenWeatherMap One Call API 3.0 (Required)

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. **Important**: Subscribe to [One Call API 3.0](https://openweathermap.org/api/one-call-3)
   - Free tier: 1,000 calls/day
   - Provides current weather, hourly forecast, daily forecast, and weather alerts

### 2. Configure API Key

Update the API key in `appsettings.json` or `appsettings.Development.json`:

```json
{
  "OpenWeatherMap": {
    "ApiKey": "your_actual_api_key_here"
  }
}
```

**Alternative**: Set environment variable:

```bash
export OpenWeatherMap__ApiKey="your_actual_api_key_here"
```

### 3. Run the Application

```bash
dotnet run
```

The API will be available at:

- **HTTPS**: `https://localhost:7000`
- **HTTP**: `http://localhost:5283`

## 📡 API Endpoints

### Current Weather

```
GET /api/weather/current?city=New Castle&state=Pennsylvania&country=US
```

Returns current weather conditions for the specified location.

**Parameters:**

- `city` (required): City name
- `state` (optional): State or region name
- `country` (optional): Country code (defaults to US)

### 5-Day Forecast

```
GET /api/weather/forecast?city=New Castle&state=Pennsylvania&country=US
```

Returns a 5-day weather forecast.

### Weather Alerts

```
GET /api/weather/alerts?city=New Castle&state=Pennsylvania&country=US
```

Returns current weather alerts for the specified location.

### API Configuration Test

```
GET /api/weather/test
```

Tests if your OpenWeatherMap One Call API 3.0 key is configured correctly.

## ⚡ Caching System

### Cache Duration

- **Weather Data**: 30 minutes (current, forecast, alerts)
- **Geocoding Data**: 24 hours (city coordinates)

### Cache Keys

- `weather_data_{lat},{lon}` - All weather data for coordinates
- `geocoding_{city},{state},{country}` - City geocoding results

### Benefits

- **API Call Efficiency**: One Call API 3.0 provides all weather data in a single request
- **Rate Limit Protection**: Reduces API calls significantly
- **Improved Performance**: Faster response times with caching
- **Cost Efficiency**: Minimizes API usage costs

## 🔄 Fallback System

When external APIs are unavailable:

1. **One Call API 3.0 Fails**: Returns realistic seasonal demo weather data
2. **Geocoding Fails**: Defaults to New York coordinates
3. **All APIs Fail**: Serves cached data or demo data

## 🏗️ Architecture

```
Client Request (city/state/country)
     ↓
API Endpoint
     ↓
WeatherService
     ↓
Cache Check → [HIT] Return Cached Data
     ↓ [MISS]
Geocoding API (get coordinates)
     ↓
One Call API 3.0 (comprehensive weather)
     ↓
Cache Result
     ↓
Return Data
```

## 📦 Dependencies

- **Microsoft.Extensions.Caching.Memory**: In-memory caching
- **System.Text.Json**: JSON serialization
- **HttpClient**: External API calls

## 🚀 Deployment Notes

### Production Considerations

1. **API Key Security**: Use Azure Key Vault or similar
2. **Cache Storage**: Consider Redis for distributed caching
3. **Rate Limiting**: Implement client-side rate limiting
4. **Monitoring**: Add application insights for API usage tracking

### Environment Variables

```bash
OpenWeatherMap__ApiKey=your_production_api_key
```

## 🔍 Monitoring & Logging

The service logs:

- Cache hits/misses
- API call success/failures
- Fallback activations
- Geocoding results
- Performance metrics

Check application logs for debugging and monitoring API usage.

## 🤝 Integration with React Frontend

The API is configured with CORS to work with the React frontend running on `http://localhost:5173`.

All endpoints now require city parameter, making the API cleaner and more predictable.

## 🆕 What's New

- **Upgraded to One Call API 3.0**: More comprehensive weather data
- **Removed IP-API dependency**: Cleaner architecture
- **City-based queries only**: More accurate and predictable
- **Enhanced caching strategy**: Better performance and API conservation
- **Real weather alerts**: Actual alerts from OpenWeatherMap (when available)

## 📋 Example Usage

```bash
# Get current weather
curl "http://localhost:5283/api/weather/current?city=New Castle&state=Pennsylvania&country=US"

# Get 5-day forecast
curl "http://localhost:5283/api/weather/forecast?city=New Castle&state=Pennsylvania&country=US"

# Get weather alerts
curl "http://localhost:5283/api/weather/alerts?city=New Castle&state=Pennsylvania&country=US"

# Test API configuration
curl "http://localhost:5283/api/weather/test"
```
