import React from "react";
import { Home, Clock, Calendar, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MobileScreenFooter = () => {
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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg px-4  z-50">
      {/* Plus Button - Floating Action Button with Pink Gradient */}
      <button
        onClick={() => handleFeatureClick("Create New")}
        className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg flex items-center justify-center text-2xl font-bold z-10 transition-all duration-300 hover:from-pink-500 hover:to-pink-700 hover:shadow-xl active:scale-95"
      >
        +
      </button>

      {/* Bottom Navigation Bar */}
      <div className="flex items-center justify-around w-full max-w-md mx-auto">
        <Link
          to="/"
          className="flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover:bg-pink-50 group"
        >
          <Home size={22} className="text-pink-600 group-hover:text-pink-700" />
          <span className="text-xs mt-1 text-pink-600 font-medium">Home</span>
        </Link>

        <button
          onClick={() => handleFeatureClick("History")}
          className="flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover:bg-pink-50 group"
        >
          <Clock
            size={22}
            className="text-gray-500 group-hover:text-pink-600"
          />
          <span className="text-xs mt-1 text-gray-600 group-hover:text-pink-600">
            History
          </span>
        </button>

        <button
          onClick={() => handleFeatureClick("Calendar")}
          className="flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover:bg-pink-50 group"
        >
          <Calendar
            size={22}
            className="text-gray-500 group-hover:text-pink-600"
          />
          <span className="text-xs mt-1 text-gray-600 group-hover:text-pink-600">
            Calendar
          </span>
        </button>

        <button
          onClick={() => handleFeatureClick("Settings")}
          className="flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover:bg-pink-50 group"
        >
          <Settings
            size={22}
            className="text-gray-500 group-hover:text-pink-600"
          />
          <span className="text-xs mt-1 text-gray-600 group-hover:text-pink-600">
            Settings
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileScreenFooter;
