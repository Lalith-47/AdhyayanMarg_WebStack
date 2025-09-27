import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AdminProtectedRoute from "./components/Auth/AdminProtectedRoute";
import ThemeFavicon from "./components/ThemeFavicon";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Lazy load pages for better performance
const Home = React.lazy(() => import("./pages/Home"));
const UnifiedLogin = React.lazy(() => import("./pages/UnifiedLogin"));
const Quiz = React.lazy(() => import("./pages/Quiz"));
const Roadmap = React.lazy(() => import("./pages/Roadmap"));
const Colleges = React.lazy(() => import("./pages/Colleges"));
const Chatbot = React.lazy(() => import("./pages/Chatbot"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemeFavicon />
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/login" element={<UnifiedLogin />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="roadmap" element={<Roadmap />} />
                <Route path="colleges" element={<Colleges />} />
                <Route path="chatbot" element={<Chatbot />} />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin"
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
