import React from "react";
import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          All Doctors
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
          {doctors.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:scale-105 hover:shadow-2xl rounded-2xl p-4 flex flex-col items-center transition-all duration-300 bg-indigo-50"
            >
              <img
                src={item.image}
                alt=""
                className="w-28 h-28 object-cover rounded-full mb-4 border-2 border-indigo-400 "
              />
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500 mb-2">{item.speciality}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className="w-4 h-4 accent-green-600"
                  />
                  <p
                    className={`text-sm font-medium ${
                      item.available ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    Available
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
