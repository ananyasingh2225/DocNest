import React, { useContext, useState } from "react";
//import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Ananya_Profile from "../assets/Ananya_Profile.jpg";
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {
  // const [userData, setUserData] = useState({
  //   name: "Ananya Singh",
  //   image: Ananya_Profile,
  //   email: "singhananya2225@gmail.com",
  //   phone: "+91 9026629263",
  //   address: {
  //     line1: "245c/20 Jayantipur",
  //     line2: "Preetam Nagar ,Prayagraj",
  //   },
  //   gender: "Female",
  //   dob: "2003-03-25",
  // });
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        toast.success("Profile updated successfully");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    }
  };
  if (!userData || !userData.name) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }
  return (
    <div>
      <div className="max-w-xl mx-auto bg-blue-100 p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="text-4xl font-bold text-gray-800 border-b-2 border-gray-300 focus:outline-none focus:border-blue-400"
              />
            ) : (
              <p className="text-4xl font-bold text-gray-800">
                {userData.name}
              </p>
            )}
          </div>
          {isEdit ? (
            <label htmlFor="image">
              <div className="w-28 h-28  object-cover  border-4 border-blue-300 shadow-md cursor-pointer">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
                {/* <img src={image ? "" : assets.upload_icon} alt="" /> */}
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              className="w-28 h-28  object-cover  border-4 border-blue-300 shadow-md"
              src={userData.image}
              alt=""
            />
          )}
          {/* <img
            className="w-28 h-28  object-cover  border-4 border-blue-300 shadow-md"
            src={userData.image}
            alt=""
          /> */}
        </div>

        <hr className="border-gray-300 mb-4" />
        <div className="space-y-3">
          <p className="text-lg font-semibold text-gray-700">
            CONTACT INFORMATION
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-600">Email :</p>
              <p className="text-gray-800">{userData.email}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Phone :</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  // className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 text-gray-800"
                />
              ) : (
                <p className="text-gray-800">{userData.phone}</p>
              )}
            </div>
            <div className="col-span-full">
              <p className="font-medium text-gray-600">Address :</p>
              {isEdit ? (
                <p>
                  <input
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={userData.address.line1}
                    type="text"
                    className="text-gray-800"
                    // className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 "
                  />
                  <br />
                  <input
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={userData.address.line2}
                    type="text"

                    // className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-400"
                  />
                </p>
              ) : (
                <p className="text-gray-800">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" mt-3 space-y-3">
          <p className="text-lg font-semibold text-gray-700">
            MORE INFORMATION
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-600">Gender :</p>
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  className="text-gray-800"
                  // className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 text-gray-800"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-800">{userData.gender}</p>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-600">DOB :</p>
              {isEdit ? (
                <input
                  type="date"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  value={userData.dob}
                  className="text-gray-800"
                  // className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 text-gray-800"
                />
              ) : (
                <p className="text-gray-800"> {userData.dob}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        {isEdit ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-all"
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
