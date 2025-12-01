import React, { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { useState } from "react";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  return (
    profileData && (
      <div className="p-6 md:p-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-8 border border-indigo-200">
          <div className="flex-shrink-0">
            <img
              className="w-40 h-40 rounded-xl object-cover border-2 border-indigo-300 shadow-md"
              src={profileData.image}
              alt=""
            />
          </div>
          <div className="flex flex-col flex-1 text-gray-700">
            {/**name degree info */}
            <p className="text-3xl font-semibold text-indigo-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-lg text-gray-600">
                {profileData.degree} - {profileData.speciality}
              </p>
              <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-lg shadow-sm">
                {profileData.experience}
              </span>
            </div>
            {/* {Doctor about} */}
            <div className="mt-5">
              <h2 className="text-xl font-semibold text-indigo-700">About</h2>
              <p className="text-gray-600 leading-relaxed mt-2">
                {profileData.about}
              </p>
            </div>
            <p className="mt-4 text-gray-600">
              Appointment Fee :{" "}
              <button
                onClick={() => setIsEdit(true)}
                className="font-semibold text-indigo-700"
              >
                {currency}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </button>
            </p>
            <div className="mt-4">
              <p className="font-semibold text-indigo-700">Address:</p>
              <p className="text-gray-600 mt-1 leading-relaxed">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
                className="w-5 h-5 text-indigo-600 accent-indigo-600"
              />
              <label className="text-gray-700 text-sm font-medium" htmlFor="">
                Available
              </label>
            </div>
            {isEdit ? (
              <button
                onClick={() => isEdit(false)}
                className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 
                       text-white rounded-lg shadow-md transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => isEdit(true)}
                className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 
                       text-white rounded-lg shadow-md transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
