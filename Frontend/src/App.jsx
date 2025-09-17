import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

import LoadingSpinner from "./components/LoadingSpinner";
import ResponsiveLayout from "./layout/ResponsiveLayout";

import {
  publicRoutes,
  protectedRoutes,
  roleBasedRoutes,
  fallbackRoute,
} from "./routes/routesConfig";

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element, onlyGuest }) => (
        <Route
          key={path}
          path={path}
          element={
            user && onlyGuest ? (
              <Navigate to={`/${user.role}`} replace />
            ) : (
              <ResponsiveLayout>{element}</ResponsiveLayout> // Wrap here
            )
          }
        />
      ))}

      {/* Protected Routes */}
      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            user ? (
              <ResponsiveLayout>{element}</ResponsiveLayout> // Wrap here
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      ))}

      {/* Role-Based Routes */}
      {roleBasedRoutes.map(({ path, element, role }) => (
        <Route
          key={path}
          path={path}
          element={
            user?.role === role ? (
              <ResponsiveLayout>{element}</ResponsiveLayout> // Wrap here
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      ))}

      {/* Fallback Route */}
      <Route
        path={fallbackRoute.path}
        element={<ResponsiveLayout>{fallbackRoute.element}</ResponsiveLayout>}
      />
    </Routes>
  );
}

export default App;
