import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
//import { assets } from "../../../../frontend/src/assets/assets";
import doctor_icon from "../../assets/doctor_icon.svg";
import appointments_icon from "../../assets/appointments_icon.svg";
import patients_icon from "../../assets/patients_icon.svg";
import { assets } from "../../../../frontend/src/assets/assets";
import list_icon from "../../assets/list_icon.svg";
import { AppContext } from "../../context/AppContext";
const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-1 min-w-42 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-10" src={doctor_icon} alt="" />
            <div>
              <p className="text-md ">{dashData.doctors}</p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 min-w-42 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-10" src={appointments_icon} alt="" />
            <div>
              <p className="text-md ">{dashData.appointments}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 min-w-42 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-10" src={patients_icon} alt="" />
            <div>
              <p className="text-md ">{dashData.patients}</p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2 px-4 py-4 mt-10 rounded-t border">
            <img src={list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.docData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.docData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-6 cursor-pointer"
                    src={assets.cross_icon}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
