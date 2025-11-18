import { createContext, useState, useEffect } from "react";
//import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log("Backend URL:", backendUrl);
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState({
    name: "",
    image: "",
    email: "",
    phone: "",
    address: { line1: "", line2: "" },
    gender: "",
    dob: "",
  });
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error("Failed to fetch doctors data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch doctors data");
    }
  };
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    logout,
    userData,
    setUserData,
    loadUserProfileData,
  };
  useEffect(() => {
    getDoctorsData();
  }, []);
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
