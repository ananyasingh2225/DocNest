import React, { useContext } from "react";
//import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import _Logo from "../assets/_Logo.png";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();
  const logout = () => {
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    navigate("/");
  };
  return (
    <div className=" flex flex-col sm:flex-row sm:justify-between  items-center px-4 sm:px-8 py-4  backdrop-blur-lg bg-white/70 shadow-lg border-b border-gray-200">
      <div className="flex items-center gap-2 ">
        <img className="w-14 h-14 object-contain" src={_Logo} alt="" />

        <h1 className="text-lg sm:text-xl font-semibold text-gray-700">
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-800 drop-shadow-sm">
            Admin
          </span>{" "}
          <span className="text-gray-700">Dashboard</span>
        </h1>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <p className="px-4 py-1 rounded-full text-white  text-base bg-gradient-to-r from-blue-500 to-blue-800 shadow-sm ">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-900 text-white font-semibold px-4 py-1 rounded-full shadow-lg transition-all duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
