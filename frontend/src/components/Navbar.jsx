// import React from "react";
import React, { useState, useContext } from "react";
// import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
// import _Logo from "./_Logo.png";
import _Logo from "../assets/_Logo.png";
import Ananya_Profile from "../assets/Ananya_Profile.jpg";
//import { useContext } from "react";
import { AppContext } from "../context/AppContext";
// export const assets = {
//   _Logo: _Logo,
// };
const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300 px-5 relative">
      {/* <div className="flex items-center gap-3"> */}
      <img
        className="w-6 cursor-pointer sm:hidden absolute left-5 top-1/2 -translate-y-1/2"
        onClick={() => setShowMenu(true)}
        src={assets.menu_icon}
        alt=""
      />

      <div className="flex justify-center w-full sm:w-auto">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="w-14 cursor-pointer mx-auto sm:mx-0"
          src={_Logo}
          alt=""
        />
      </div>
      <ul className="hidden sm:flex items-start gap-5 font-medium text-lg text-gray-700">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          {/* <hr className="border-none-outline-none h-0.5 bg-primary w-3/5 m-auto  hidden hidden" /> */}
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          {/* <hr className="border-none-outline-none h-0.5 bg-primary w-3/5 m-auto hidden hidden" /> */}
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          {/* <hr className="border-none-outline-none h-0.5 bg-primary w-3/5 m-auto hidden hidden" /> */}
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          {/* <hr className="border-none-outline-none h-0.5 bg-primary w-3/5 m-auto hidden hidden" /> */}
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-12 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 ">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}
      </div>

      {/* ===== Mobile menu (slide-out) ===== */}
      <div
        className={`fixed md:hidden top-0 right-0 bottom-0 z-20 bg-white transition-all duration-300 ease-in-out ${
          showMenu ? "w-full" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <img
            className="w-16"
            src={_Logo}
            alt=""
            onClick={() => navigate("/")}
          />
          <img
            className="w-7 cursor-pointer"
            src={assets.cross_icon}
            alt="close"
            onClick={() => setShowMenu(false)}
          />
        </div>

        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/">
            <p className="px-4 py-2 rounded full inline-block">HOME</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors">
            <p className="px-4 py-2 rounded full inline-block">ALL DOCTORS</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">
            <p className="px-4 py-2 rounded full inline-block">ABOUT</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">
            <p className="px-4 py-2 rounded full inline-block">CONTACT</p>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
