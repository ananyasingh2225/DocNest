import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-sm flex flex-col py-6">
      {aToken && (
        <ul className="mt-2 flex flex-col gap-1">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-500 text-indigo-600 shadow-sm"
                  : "hover:bg-gray-100 text-gray-600 hover:text-indigo-600"
              }`
            }
            to={"/admin-dashboard"}
          >
            <img
              className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-all duration-200"
              src={assets.home_icon}
              alt=""
            />
            <p className="font-medium tracking-wide">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-500 text-indigo-600 shadow-sm"
                  : "hover:bg-gray-100 text-gray-600 hover:text-indigo-600"
              }`
            }
            to={"/all-appointments"}
          >
            <img
              className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-all duration-200"
              src={assets.appointment_icon}
              alt=""
            />
            <p className="font-medium tracking-wide hidden md:block">
              Appointments
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-500 text-indigo-600 shadow-sm"
                  : "hover:bg-gray-100 text-gray-600 hover:text-indigo-600"
              }`
            }
            to={"/add-doctor"}
          >
            <img
              className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-all duration-200"
              src={assets.add_icon}
              alt=""
            />
            <p className="font-medium tracking-wide hidden md:block">
              Add Doctors
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-500 text-indigo-600 shadow-sm"
                  : "hover:bg-gray-100 text-gray-600 hover:text-indigo-600"
              }`
            }
            to={"/doctors-list"}
          >
            <img
              className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-all duration-200"
              src={assets.people_icon}
              alt=""
            />
            <p className="font-medium tracking-wide hidden md:block">
              Doctors List
            </p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="mt-2 flex flex-col gap-1">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-500 text-indigo-600 shadow-sm"
                  : "hover:bg-gray-100 text-gray-600 hover:text-indigo-600"
              }`
            }
            to={"/doctor-dashboard"}
          >
            <img
              className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-all duration-200"
              src={assets.home_icon}
              alt=""
            />
            <p className="font-medium tracking-wide hidden md:block">
              Dashboard
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-500 text-indigo-600 shadow-sm"
                  : "hover:bg-gray-100 text-gray-600 hover:text-indigo-600"
              }`
            }
            to={"/doctor-appointments"}
          >
            <img
              className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-all duration-200"
              src={assets.appointment_icon}
              alt=""
            />
            <p className="font-medium tracking-wide hidden md:block">
              Appointments
            </p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-500 text-indigo-600 shadow-sm"
                  : "hover:bg-gray-100 text-gray-600 hover:text-indigo-600"
              }`
            }
            to={"/doctor-profile"}
          >
            <img
              className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-all duration-200"
              src={assets.people_icon}
              alt=""
            />
            <p className="font-medium tracking-wide hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
