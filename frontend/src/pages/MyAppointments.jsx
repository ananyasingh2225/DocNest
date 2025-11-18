import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <p className="text-2xl font-semibold text-center text-gray-700 mb-6">
        My Appointments
      </p>
      <div className="flex flex-col gap-4">
        {doctors.slice(0, 2).map((item, index) => (
          <div
            className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-center sm:items-start justify-between hover:shadow-lg transition-all duration-300"
            key={index}
          >
            <div className="flex-shrink-0">
              <img
                className="w-24 h-24 rounded-full object-cover border-2 border-teal shadow-sm"
                src={item.image}
                alt=""
              />
            </div>
            <div className="flex-1 mt-3 sm:mt-0 sm:ml-4 text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-teal-600 font-medium mb-1 text-sm">
                {item.speciality}
              </p>
              <p className="text-gray-600 text-xs">
                {" "}
                <span className="font-semibold text-gray-700"> Address :</span>
              </p>
              <p className="text-gray-500 text-xs">{item.address.line1}</p>
              <p className="text-gray-500 text-xs mb-1">{item.address.line2}</p>
              <p className="text-gray-600 text-xs">
                <span className="font-semibold text-gray-700">
                  Date & Time:
                </span>
                10, October, 2025 | 8:30 PM
              </p>
            </div>
            <div></div>
            <div className="mt-3 sm:mt-0 flex gap-2">
              <button className="px-3 py-1.5 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600 transition duration-200">
                Pay Online
              </button>
              <button className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition duration-200">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
