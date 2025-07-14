# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

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

This project includes a comprehensive test suite with 120+ tests covering:

- **Component Testing** - All major UI components
- **User Interactions** - Clicks, navigation, form submissions
- **State Management** - Loading, error, and empty states
- **Accessibility** - Proper structure and ARIA attributes
- **Integration** - Component interactions and data flow

Tests are written using:

- [Vitest](https://vitest.dev/) - Fast test runner
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Component testing utilities
- [jsdom](https://github.com/jsdom/jsdom) - DOM environment for testing

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
