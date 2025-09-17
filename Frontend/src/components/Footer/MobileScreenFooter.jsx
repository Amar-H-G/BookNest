import React from "react";
import { Home, Clock, Calendar, Settings } from "lucide-react"; // Install: npm install lucide-react

const MobileScreenFooter = () => {
  return (
    <div className="relative flex items-center justify-center bg-white border-t border-gray-200 px-4 py-3">
      {/* Plus Button - Floating Action Button */}
      <button className="absolute top-[-16px] left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-purple-600 text-white shadow-lg flex items-center justify-center text-xl font-bold z-10 transition-transform hover:scale-105 active:scale-95">
        +
      </button>

      {/* Bottom Navigation Bar */}
      <div className="flex items-center justify-around w-full max-w-xs">
        <button className="flex flex-col items-center p-2 text-gray-600 hover:text-purple-600 transition-colors">
          <Home size={20} className="text-purple-600" />
          <span className="text-xs mt-1">Home</span>
        </button>

        <button className="flex flex-col items-center p-2 text-gray-600 hover:text-purple-600 transition-colors">
          <Clock size={20} className="text-gray-600" />
          <span className="text-xs mt-1">History</span>
        </button>

        <button className="flex flex-col items-center p-2 text-gray-600 hover:text-purple-600 transition-colors">
          <Calendar size={20} className="text-gray-600" />
          <span className="text-xs mt-1">Calendar</span>
        </button>

        <button className="flex flex-col items-center p-2 text-gray-600 hover:text-purple-600 transition-colors">
          <Settings size={20} className="text-gray-600" />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default MobileScreenFooter;
