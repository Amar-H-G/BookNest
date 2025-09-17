import React, { useState } from "react";
import { Home, Clock, Heart, Settings, Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This is a placeholder for your authentication context.
// In a real app, this would come from a global state manager (like Redux or Zustand)
// or a context provider that holds user login status and role.
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to false to test logged-out state
  const [userRole, setUserRole] = useState("seeker"); // "seeker" or "seller"

  // Simulating login/role change for demonstration
  // useEffect(() => {
  //   // Example: Fetch user data on component mount
  //   const user = { loggedIn: true, role: "seller" };
  //   setIsLoggedIn(user.loggedIn);
  //   setUserRole(user.role);
  // }, []);

  return { isLoggedIn, userRole };
};

const MobileScreenFooter = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userRole } = useAuth(); // Get auth state and user role

  const handleFeatureClick = (featureName) => {
    toast.info(`${featureName} service is currently in implementation stage.`, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleCenterButtonClick = () => {
    if (userRole === "seller") {
      handleFeatureClick("Create New");
    } else {
      handleFeatureClick("Search");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg px-4 z-50">
      {/* Center Button - Floating Action Button */}
      <button
        onClick={handleCenterButtonClick}
        className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg flex items-center justify-center text-2xl font-bold z-10 transition-all duration-300 hover:from-pink-500 hover:to-pink-700 hover:shadow-xl active:scale-95"
      >
        {userRole === "seller" ? <Plus size={24} /> : <Search size={22} />}
      </button>

      {/* Bottom Navigation Bar */}
      <div className="flex items-center justify-around w-full max-w-md mx-auto">
        {/* Home */}
        <Link
          to="/"
          className="flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover:bg-pink-50 group"
        >
          <Home size={22} className="text-pink-600 group-hover:text-pink-700" />
          <span className="text-xs mt-1 text-pink-600 font-medium">Home</span>
        </Link>

        {/* Wishlist */}
        <button
          onClick={() => handleFeatureClick("Wishlist")}
          className="flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover:bg-pink-50 group"
        >
          <Heart
            size={22}
            className="text-gray-500 group-hover:text-pink-600"
          />
          <span className="text-xs mt-1 text-gray-600 group-hover:text-pink-600">
            Wishlist
          </span>
        </button>

        {/* Empty space for the floating button */}
        <div className="w-16 h-12"></div>

        {/* Wallet */}
        <button
          onClick={() => handleFeatureClick("Wallet")}
          className="flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover:bg-pink-50 group"
        >
          <Clock
            size={22}
            className="text-gray-500 group-hover:text-pink-600"
          />
          <span className="text-xs mt-1 text-gray-600 group-hover:text-pink-600">
            Wallet
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={handleProfileClick}
          className="flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover:bg-pink-50 group"
        >
          <Settings
            size={22}
            className="text-gray-500 group-hover:text-pink-600"
          />
          <span className="text-xs mt-1 text-gray-600 group-hover:text-pink-600">
            Profile
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileScreenFooter;
