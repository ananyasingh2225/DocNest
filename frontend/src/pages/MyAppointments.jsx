import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] +
      " " +
      months[Number(dateArray[1]) - 1] +
      ", " +
      dateArray[2]
    );
  };
  const navigate = useNavigate();
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
      //   headers: { token: localStorage.getItem("token") },
      // });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch appointments");
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }

      //toast.error(data.message);
    } catch (error) {
      console.log("Catch Error", error);
      toast.error("Failed to cancel appointment");
    }
  };
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Test Transaction",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log("Payment Success:", response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log("Verification Error:", error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        initPay(data.order);
        //console.log("Razorpay Order Created:", data.order);
      }
    } catch (error) {
      console.log("Razorpay Error:", error);
      toast.error("Failed to initiate payment");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <p className="text-2xl font-semibold text-center text-gray-700 mb-6">
        My Appointments
      </p>
      <div className="flex flex-col gap-4">
        {appointments.map((item, index) => (
          <div
            className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-center sm:items-start justify-between hover:shadow-lg transition-all duration-300"
            key={index}
          >
            <div className="flex-shrink-0">
              <img
                className="w-24 h-24 rounded-full object-cover border-2 border-teal shadow-sm"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 mt-3 sm:mt-0 sm:ml-4 text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-800">
                {item.docData.name}
              </p>
              <p className="text-teal-600 font-medium mb-1 text-sm">
                {item.docData.speciality}
              </p>
              <p className="text-gray-600 text-xs">
                {" "}
                <span className="font-semibold text-gray-700"> Address :</span>
              </p>
              <p className="text-gray-500 text-xs">
                {item.docData.address.line1}
              </p>
              <p className="text-gray-500 text-xs mb-1">
                {item.docData.address.line2}
              </p>
              <p className="text-gray-600 text-xs">
                <span className="font-semibold text-gray-700">
                  Date & Time:
                </span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="mt-3 sm:mt-0 flex gap-2">
              {!item.cancelled && item.payment && (
                <button className="px-4 py-2 border rounded-lg text-white bg-teal-500 inline-flex items-center">
                  Paid
                </button>
              )}
              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="px-3 py-1.5 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600 transition duration-200"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && (
                <button className="px-3 py-2 border border-red-500 rounded-lg text-red-500 inline-flex items-center">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
