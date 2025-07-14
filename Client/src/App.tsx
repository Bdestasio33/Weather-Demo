import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";

import theme from "./theme/theme";
import { queryClient } from "./lib/queryClient";
import { UserProvider } from "./contexts/UserContext";
import { DashboardProvider } from "./contexts/DashboardContext";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <DashboardProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router basename="/Weather-Demo">
              <Layout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </Layout>
            </Router>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              toastStyle={{
                background: "var(--color-bg-glass)",
                backdropFilter: "var(--backdrop-blur-lg)",
                border: "1px solid var(--color-border-light)",
                borderRadius: "var(--radius-lg)",
                color: "var(--color-text-primary)",
              }}
            />
          </ThemeProvider>
        </DashboardProvider>
      </UserProvider>
      {/* React Query DevTools - only shows in development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
