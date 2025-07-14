# Weather API - Clean Architecture

A well-structured .NET 8 Web API following Clean Architecture principles with proper separation of concerns.

## 🏗️ Architecture Overview

This project follows **Clean Architecture** principles to ensure maintainability, testability, and scalability:

```
Weather App Demo/
├── 📁 Api/                     # Presentation Layer
│   └── Controllers/            # API Controllers
├── 📁 Application/             # Application Layer
│   ├── DTOs/                   # Data Transfer Objects
│   ├── Extensions/             # Service Registration Extensions
│   └── Configuration/          # Configuration Models
├── 📁 Core/                    # Domain Layer
│   ├── Interfaces/             # Service Contracts
│   ├── Models/                 # Domain Models
│   └── Services/               # Business Logic Services
├── 📁 Infrastructure/          # Infrastructure Layer
│   └── External/               # External API Models
└── 📁 Common/                  # Shared Layer
    └── Constants/              # Application Constants
```

## 📂 Folder Structure Details

### 🎯 **Api/** - Presentation Layer

**Purpose**: Handles HTTP requests and responses

- **Controllers/**: REST API controllers using attribute routing
  - `WeatherController.cs`: Main weather endpoints with proper documentation
  - Handles request validation, response formatting, and error handling
  - Uses DTOs for clean API contracts

### 🔧 **Application/** - Application Layer

**Purpose**: Coordinates between presentation and domain layers

- **DTOs/**: Data Transfer Objects for API communication

  - `WeatherDTOs.cs`: Clean API response models
  - Includes additional computed properties (e.g., `SeverityText`)

- **Extensions/**: Service registration and configuration

  - `ServiceCollectionExtensions.cs`: Organized dependency injection setup
  - Modular service registration methods

- **Configuration/**: Type-safe configuration models
  - `WeatherApiOptions.cs`: Strongly-typed settings classes
  - Configuration validation and defaults

### 🏛️ **Core/** - Domain Layer

**Purpose**: Contains business logic and domain models

- **Interfaces/**: Service contracts and abstractions

  - `IWeatherService.cs`: Weather service contract
  - Well-documented interface with clear responsibilities

- **Models/**: Rich domain models with business logic

  - `WeatherModels.cs`: Domain entities with computed properties
  - Business rules and domain validation

- **Services/**: Core business logic implementation
  - `WeatherService.cs`: Main weather service with caching and fallbacks
  - Implements domain logic and external API integration

### 🔌 **Infrastructure/** - Infrastructure Layer

**Purpose**: External concerns and data access

- **External/**: External API integration models
  - `OpenWeatherMapModels.cs`: External API response models
  - JSON serialization attributes for third-party APIs

### 🔄 **Common/** - Shared Layer

**Purpose**: Shared utilities and constants

- **Constants/**: Application-wide constants
  - `WeatherConstants.cs`: Centralized constants and configuration
  - Cache keys, API endpoints, default values

## 🎯 Design Principles

### ✅ **Separation of Concerns**

- Each layer has a single, well-defined responsibility
- Clear boundaries between presentation, business logic, and infrastructure
- Dependencies flow inward (Clean Architecture dependency rule)

### ✅ **Dependency Inversion**

- Core layer defines interfaces, infrastructure implements them
- Enables testability and loose coupling
- Easy to swap implementations (e.g., different weather APIs)

### ✅ **Single Responsibility**

- Each class has one reason to change
- Controllers handle HTTP concerns only
- Services handle business logic only
- Models represent domain concepts

### ✅ **Open/Closed Principle**

- Easy to extend functionality without modifying existing code
- New weather providers can be added by implementing interfaces
- Configuration-driven behavior changes

## 🔄 Data Flow

```
HTTP Request
    ↓
WeatherController (API Layer)
    ↓
IWeatherService (Core Interface)
    ↓
WeatherService (Core Implementation)
    ↓
External APIs (Infrastructure)
    ↓
Domain Models (Core)
    ↓
DTOs (Application)
    ↓
HTTP Response
```

## 🔌 Dependency Injection

Services are organized into logical groups using extension methods:

```csharp
// Program.cs
builder.Services.AddWeatherControllers();
builder.Services.AddWeatherDocumentation();
builder.Services.AddWeatherCors();
builder.Services.AddCachingServices();
builder.Services.AddWeatherServices();
```

## 📋 Key Features

### 🏃‍♂️ **Performance**

- **Memory Caching**: 30-minute cache with configurable size limits
- **HTTP Client Reuse**: Proper HttpClient factory pattern
- **Async/Await**: Non-blocking I/O operations throughout

### 🛡️ **Reliability**

- **Graceful Fallbacks**: Demo data when APIs fail
- **Error Handling**: Comprehensive exception handling with logging
- **Timeout Management**: Configurable timeouts for external calls

### 📚 **Documentation**

- **OpenAPI/Swagger**: Full API documentation with examples
- **XML Comments**: Comprehensive code documentation
- **Response Types**: Explicit return type documentation

### 🔧 **Configuration**

- **Type-Safe Config**: Strongly-typed configuration options
- **Environment-Specific**: Different settings per environment
- **Validation**: Configuration validation on startup

## 🧪 Testing Strategy

The architecture supports comprehensive testing:

- **Unit Tests**: Test business logic in isolation
- **Integration Tests**: Test API endpoints and external dependencies
- **Contract Tests**: Verify API contracts match documentation

## 🚀 Deployment Considerations

### 📦 **Production Readiness**

- Structured logging with correlation IDs
- Health checks for external dependencies
- Configuration validation
- Proper error handling and monitoring

### 🔐 **Security**

- API key management through configuration
- CORS policies for cross-origin access
- Input validation and sanitization

### 📈 **Scalability**

- Stateless design for horizontal scaling
- Configurable caching strategies
- External dependency isolation

## 🔗 External Dependencies

- **OpenWeatherMap API**: Real weather data
- **IP-API**: Location detection from IP address
- **Microsoft.Extensions.Caching.Memory**: In-memory caching
- **System.Text.Json**: JSON serialization

## 📝 Development Guidelines

1. **Follow the dependency rule**: Dependencies only point inward
2. **Use interfaces**: Define contracts for all external dependencies
3. **Keep controllers thin**: Delegate business logic to services
4. **Document everything**: Use XML comments and OpenAPI attributes
5. **Handle errors gracefully**: Always provide meaningful error responses
6. **Write testable code**: Avoid static dependencies and global state

This architecture provides a solid foundation for building maintainable, scalable, and testable weather APIs.
