import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import OwnerDashboard from "./pages/owner";
import SeekerDashboard from "./pages/seeker";
import EditProfilePage from "./pages/editProfileForm";
import LoadingSpinner from "./components/LoadingSpinner";
import Error404Page from "./components/Error404Page";

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={user ? <Navigate to={`/${user.role}`} replace /> : <Login />}
      />
      <Route
        path="/register"
        element={
          user ? <Navigate to={`/${user.role}`} replace /> : <Register />
        }
      />

      {/* Protected Routes */}
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/edit-profile/:id"
        element={user ? <EditProfilePage /> : <Navigate to="/login" replace />}
      />

      {/* Owner Dashboard */}
      <Route
        path="/owner"
        element={
          user?.role === "owner" ? (
            <OwnerDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Seeker Dashboard */}
      <Route
        path="/seeker"
        element={
          user?.role === "seeker" ? (
            <SeekerDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default App;
