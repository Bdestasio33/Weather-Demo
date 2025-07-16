# React + TypeScript + Vite Weather Dashboard

A modern weather dashboard built with React, TypeScript, and Vite, featuring drag-and-drop widgets, responsive design, and comprehensive weather data visualization.

## Features

- **Interactive Weather Dashboard** - Drag-and-drop widget customization
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Real-time Weather Data** - Current conditions, forecasts, and alerts
- **Customizable Widgets** - Temperature charts, wind compass, UV index, and more
- **User Preferences** - Persistent settings and temperature unit selection
- **Accessibility** - Full WCAG compliance with proper ARIA attributes

## Getting Started

This project uses [Yarn](https://yarnpkg.com/) for package management.

### Prerequisites

- Node.js 22.12.0 or higher
- Yarn 1.x

### Installation and Development

```bash
# Install dependencies
yarn install

# Start the development server
yarn dev

# Build for production
yarn build

# Preview the production build
yarn preview

# Run linting
yarn lint

# Run tests
yarn test

# Run tests with coverage
yarn test:coverage
```

The development server will start at `http://localhost:5173`.

## Available Scripts

- `yarn dev` - Start the development server with hot module replacement
- `yarn build` - Build the app for production
- `yarn lint` - Run ESLint to check for code issues
- `yarn preview` - Preview the production build locally
- `yarn test` - Run tests in watch mode
- `yarn test:ui` - Run tests with UI interface
- `yarn test:run` - Run tests once (non-watch mode)
- `yarn test:coverage` - Run tests and generate coverage report

## Testing

This project includes a comprehensive test suite with **120 tests** across **14 test files**, providing robust coverage for all major functionality:

### Test Coverage

- **Overall Coverage**: 60.38%
- **Component Coverage**: 91.65%
- **Test Files**: 14 test files covering components, pages, and edge cases

### What's Tested

- **Component Testing** - All major UI components with visual and functional tests
- **User Interactions** - Clicks, navigation, form submissions, and drag-and-drop
- **State Management** - Loading states, error handling, and empty states
- **Accessibility** - Proper ARIA attributes and semantic structure
- **Responsive Design** - Mobile and desktop layouts
- **Integration** - Component interactions and data flow
- **Edge Cases** - Empty states, error conditions, and boundary cases

### Test Files

```
src/test/
├── components/
│   ├── CurrentWeatherCard.test.tsx
│   ├── DragDropDashboard.test.tsx
│   ├── DragDropDashboard.empty.test.tsx
│   ├── Layout.test.tsx
│   ├── LocationDialog.test.tsx
│   ├── TemperatureChartCard.test.tsx
│   ├── WeatherAlertsCard.test.tsx
│   ├── WeatherAlertsCard.empty.test.tsx
│   ├── WeatherDashboard.test.tsx
│   ├── WeatherForecastCard.test.tsx
│   ├── WeatherMetricsCard.test.tsx
│   └── WindCompassCard.test.tsx
├── pages/
│   ├── DashboardPage.test.tsx
│   └── ProfilePage.test.tsx
├── setup.ts
└── utils.tsx
```

### Testing Technologies

- **[Vitest](https://vitest.dev/)** - Fast, modern test runner with native TypeScript support
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** - Simple and complete testing utilities
- **[jsdom](https://github.com/jsdom/jsdom)** - DOM environment for testing
- **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro/)** - User interaction simulation
- **[@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)** - Custom DOM element matchers

### Running Tests

```bash
# Run all tests in watch mode
yarn test

# Run tests once
yarn test:run

# Run tests with coverage report
yarn test:coverage

# Open test UI for interactive testing
yarn test:ui
```

## Architecture

### Tech Stack

- **React 19.1.0** - UI library with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 7.0.4** - Fast build tool and dev server
- **Material-UI 7.2.0** - React component library
- **React Query 5.83.0** - Data fetching and caching
- **React Router 7.6.3** - Client-side routing
- **@dnd-kit** - Drag and drop functionality

### Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React context providers
├── hooks/           # Custom hooks
├── pages/           # Page components
├── services/        # API and external services
├── test/            # Test files and utilities
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── theme/           # Material-UI theme configuration
```

## Vite Configuration

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
