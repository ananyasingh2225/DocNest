import React from "react";
import { assets } from "../assets/assets";
import headerImg from "../assets/header3.jpg";
const Header = () => {
  return (
    <div className="flex flex-col md:flex-row  bg-primary rounded-lg ">
      {/* Left side */}
      <div className="md:w-1/2 flex flex-col  justify-center gap-4 p-6 md:p-12 lg:p-16">
        <p className="text-3xl md:text-4xl lg:text-5xl text-black font-semibold leading-snug">
          Book Appointment with Trusted Doctors
        </p>
        <div className="mt-4">
          <img src={assets.group_profiles} alt="" className="mb-2" />
          <p className="text-xl">
            Simply browse through our extensive list of trusted doctors,
            <br />
            schedule your appointments hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          // mt-4 m-auto
          className="mt-4 inline-flex w-fit items-center gap-2 bg-white px-8 py-3 rounded-full text-grey-600 text-sm md:m-0 m-auto hover:scale-105 transition-all duration-300"
        >
          BOOK APPOINTMENT{" "}
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>
      {/* Right side */}
      <div className="md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
        <img
          className="w-full max-w-md md:max-w-full h-auto rounded-lg object-cover "
          src={headerImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
