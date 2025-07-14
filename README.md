# Weather Dashboard Demo

A modern, responsive weather dashboard built with React, TypeScript, and Material-UI. This application provides real-time weather information with a customizable, drag-and-drop interface.

## 🌟 Features

- **Real-time Weather Data**: Current conditions, 5-day forecast, and weather alerts
- **Customizable Dashboard**: Drag-and-drop widgets to personalize your view
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Interactive Charts**: Visual temperature trends and weather metrics
- **Location Search**: Find weather for any city worldwide
- **User Preferences**: Save your preferred temperature units and locations
- **Comprehensive Testing**: 120+ tests with excellent coverage

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

3. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   # Add your weather API key
   ```

4. **Start the development server:**

   ```bash
   yarn dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

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
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── test/           # Test utilities and setup
│   ├── public/             # Static assets
│   └── package.json
├── Server/                 # Backend API (if applicable)
└── README.md
```

## 🎯 Key Features Implemented

### Dashboard Management

- Drag-and-drop widget reordering
- Collapsible sidebar with widget controls
- Responsive grid layout
- Widget visibility toggles

### Weather Data

- Current weather conditions
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
