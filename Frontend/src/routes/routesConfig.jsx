import Home from "../pages/Home";
import Login from "../pages/login";
import Register from "../pages/register";
import Profile from "../pages/profile";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import SeekerDashboard from "../pages/seeker/SeekerDashboard";
import EditProfilePage from "../pages/editProfileForm";
import Error404Page from "../components/Error404Page";
import AdminDashboard from "../pages/AdminDashboard";
import HomePage from "../pages/HomePage";
import DynamicEmail from "../pages/Administrator/DynamicEmail";

const publicRoutes = [
  // { path: "/", element: <Home /> },
  { path: "/", element: <HomePage /> },
  { path: "/admin/dynamic-email", element: <DynamicEmail /> },
  { path: "/login", element: <Login />, onlyGuest: true },
  { path: "/register", element: <Register />, onlyGuest: true },
];

const protectedRoutes = [
  // { path: "/profile", element: <Profile /> },
  // { path: "/edit-profile/:id", element: <EditProfilePage /> },
];

const roleBasedRoutes = [
  // { path: "/owner", element: <OwnerDashboard />, role: "owner" },
  // { path: "/seeker", element: <SeekerDashboard />, role: "seeker" },
  // { path: "/admin", element: <AdminDashboard />, role: "admin" },
];

const fallbackRoute = { path: "*", element: <Error404Page /> };

export { publicRoutes, protectedRoutes, roleBasedRoutes, fallbackRoute };
