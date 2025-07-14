# Weather Dashboard Demo

A modern, responsive weather dashboard built with React, TypeScript, and Material-UI. This application provides real-time weather information with a customizable, drag-and-drop interface.

**🎯 Demo Mode:** This application currently uses comprehensive mock data to provide a fully functional demo experience without requiring API keys or backend services.

## 🌟 Features

- **Real-time Weather Data**: Current conditions, 5-day forecast, and weather alerts
- **Customizable Dashboard**: Drag-and-drop widgets to personalize your view
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Interactive Charts**: Visual temperature trends and weather metrics
- **Location Search**: Find weather for any city worldwide
- **User Preferences**: Save your preferred temperature units and locations
- **Comprehensive Testing**: 120+ tests with excellent coverage
- **Demo Mode**: Uses realistic mock data for seamless demonstration

## 🚀 Live Demo

🔗 [View Live Demo](https://bdestasio33.github.io/Weather-Demo/) _(Available after deployment)_

## 📱 Screenshots

### Desktop View

![Desktop Dashboard](https://via.placeholder.com/800x500?text=Desktop+Dashboard+Screenshot)

### Mobile View

![Mobile Dashboard](https://via.placeholder.com/400x600?text=Mobile+Dashboard+Screenshot)

## 🛠️ Tech Stack

**Frontend:**

- React 19 with TypeScript
- Material-UI (MUI) for components
- React Query for data fetching
- React Router for navigation
- @dnd-kit for drag-and-drop functionality
- Recharts for data visualization

**Development:**

- Vite for fast development and building
- Vitest for testing
- ESLint for code quality
- Yarn for package management

**Testing:**

- Vitest with React Testing Library
- 120+ comprehensive tests
- 58.39% overall coverage
- 92.66% component coverage

**Demo Data:**

- Comprehensive mock weather data
- Realistic API simulation with loading states
- No external dependencies or API keys required

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Bdestasio33/Weather-Demo.git
   cd Weather-Demo
   ```

2. **Install dependencies:**

   ```bash
   cd Client
   yarn install
   ```

3. **Start the development server:**

   ```bash
   yarn dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

**Note:** No environment variables or API keys are required for the demo mode.

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all tests
yarn test

# Run tests with UI
yarn test:ui

# Run tests once
yarn test:run

# Generate coverage report
yarn test:coverage
```

## 🏗️ Building for Production

```bash
# Build the application
yarn build

# Preview the production build
yarn preview
```

## 📁 Project Structure

```
Weather-Demo/
├── Client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks (with mock data)
│   │   ├── demo/           # Mock data for demonstration
│   │   ├── utils/          # Utility functions
│   │   └── test/           # Test utilities and setup
│   ├── public/             # Static assets
│   └── package.json
├── Server/                 # Backend API (C# .NET - not deployed)
└── README.md
```

## 🎯 Key Features Implemented

### Dashboard Management

- Drag-and-drop widget reordering
- Collapsible sidebar with widget controls
- Responsive grid layout
- Widget visibility toggles

### Weather Data (Demo Mode)

- Current weather conditions with realistic data
- 5-day weather forecast
- Weather alerts and warnings
- Temperature trend charts
- Wind compass with direction indicators

### User Experience

- Temperature unit preferences (°F/°C)
- Location search and selection
- Loading states and error handling
- Smooth animations and transitions

## 📊 Test Coverage

- **Components**: 92.66% coverage
- **Total Tests**: 120+ tests
- **Test Categories**:
  - Unit tests for all components
  - Integration tests for user flows
  - Accessibility tests
  - Responsive design tests

## 🚀 Deployment

This app is deployed using GitHub Pages:

1. **Automatic Deployment:**

   - Push to main branch triggers deployment
   - GitHub Actions runs tests and builds
   - Deploys to GitHub Pages automatically

2. **Manual Deployment:**
   ```bash
   yarn build
   # Deploy dist folder to gh-pages branch
   ```

## 💡 Architecture Notes

### Frontend Architecture

- **State Management**: React Query for server state, Context API for global state
- **Component Design**: Modular, reusable components with Material-UI
- **TypeScript**: Full type safety throughout the application
- **Testing**: Comprehensive test suite with excellent coverage

### Backend Architecture (Available but not deployed)

- **C# .NET API**: Full REST API with weather data integration
- **Clean Architecture**: Separation of concerns with proper layering
- **External APIs**: Integration with OpenWeatherMap API

### Demo Implementation

- **Mock Data**: Realistic weather data for demonstration
- **API Simulation**: Includes loading states and error handling
- **No Dependencies**: Runs without external APIs or services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Blake Destasio**

- GitHub: [@Bdestasio33](https://github.com/Bdestasio33)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap API](https://openweathermap.org/api)
- UI components by [Material-UI](https://mui.com/)
- Icons by [Material Icons](https://mui.com/material-ui/material-icons/)

---

⭐ **If you found this project helpful, please give it a star!** ⭐
