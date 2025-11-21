import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [showAllSlots, setShowAllSlots] = useState(false);

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => String(doc._id) === docId);
    setDocInfo(docInfo);
  };
  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;
        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;
      //console.log(slotDate);
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);
  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);
  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);
  return (
    docInfo && (
      <div className="px-4 sm:px-8 lg:px-16">
        <div className="flex flex-row gap-4 sm:gap-8 items-start flex-wrap pr-6">
          <div className="flex-shrink-0">
            <img
              className="bg-primary w-32 sm:max-w-40 md:w-56 lg:w-72 rounded-lg ml-6 "
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-6  bg-white mx-2 min-w-[200px] ">
            <p className="text-2xl font-semibold mb-2 flex items-center gap-2 font-medium text-gray-900">
              {docInfo.name}{" "}
              <img className="w-4" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2  text-sm  text-gray-600">
              <p>
                {docInfo.degree}-{docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-1">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium mt-1">
                Appointment fee:{" "}
                <span className="text-gray-700">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p className="font-semibold text-xl">Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map((daySlots, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-4 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>
                    {daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}
                  </p>
                  <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
                  {/* <div className="flex gap-2 flex-wrap">
                    {daySlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSlotTime(slot.time)}
                        className="border px-2 py-1 rounded-lg"
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div> */}
                </div>
              ))}
          </div>
          <div className="flex gap-2 flex-wrap mt-4">
            {(
              docSlots[slotIndex] &&
              (showAllSlots
                ? docSlots[slotIndex]
                : docSlots[slotIndex].slice(0, 5))
            )?.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => setSlotTime(slot.time)}
                className={`border px-2 py-1 rounded-lg ${
                  slotTime === slot.time ? "bg-primary text-white" : ""
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
          {docSlots[slotIndex] && docSlots[slotIndex].length > 5 && (
            <button
              onClick={() => setShowAllSlots(!showAllSlots)}
              className="mt-2 px-2 py-1 border rounded-lg text-base font-medium "
            >
              {showAllSlots ? "Show Less.." : "Show More.."}
            </button>
          )}

          {/* <div>
            {docSlots.length &&
              docSlots[slotIndex].map((daySlots, index) => (
                <p key={index}>{daySlots.time.toLowerCase()}</p>
              ))}
          </div> */}
          <div className="mt-2">
            <button
              onClick={bookAppointment}
              className="bg-red-600 text-white text-medium font-medium px-4 py-2 rounded-full  mb-16"
            >
              Book an Appointment
            </button>
          </div>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
