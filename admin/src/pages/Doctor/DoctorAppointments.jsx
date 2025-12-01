import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    getAppointments();
  }, [dToken]);
  return (
    <div className="w-full max-w-6xl p-6">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-6 tracking-wide">
        All Appointments
      </h2>
      <div className=" bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
        <div
          className="grid grid-cols-7 gap-4 bg-indigo-50 py-3 px-6 font-semibold 
                        text-indigo-700 border-b sticky top-0 z-10"
        >
          <p>#</p>
          <p>Patient</p>

          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Payment Status</p>
          <p>Action</p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-4 px-6 py-4 
                           border-b hover:bg-gray-50 transition-all"
          >
            <p className="text-gray-700 font-medium">{index + 1}</p>
            <p className="font-medium text-gray-900">{item.userData.name}</p>
            <p className="text-gray-600">{calculateAge(item.userData.dob)}</p>
            <p className="text-gray-700">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p className="font-semibold text-indigo-600">
              {currency}
              {item.amount}
            </p>
            <div>
              {item.payment ? (
                <span
                  className="px-3 py-1 text-xs rounded-full bg-green-100 
                                     text-green-700 font-medium"
                >
                  Paid
                </span>
              ) : (
                <span
                  className="px-3 py-1 text-xs rounded-full bg-red-100 
                                     text-red-600 font-medium"
                >
                  Pending
                </span>
              )}
            </div>
            {item.cancelled ? (
              <p className="text-red-400 text-sm font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-sm font-medium">Completed</p>
            ) : (
              <div>
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
