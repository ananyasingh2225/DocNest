import React from "react";
import { assets } from "../assets/assets";
import _Logo from "../assets/_Logo.png";
const Footer = () => {
  return (
    <div className="bg-olive flex flex-col gap-4 pt-3.5 mt-10 mb-0 text-sm text-white ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10 items-start w-full">
        {/* /* Left Section */}
        {/* <div className="w-16 mt-5">
          <img className="" src={_Logo} alt="" />
        </div> */}
        {/* /* Center Section */}

        {/* /* Right Section */}
        <div className="justify-center ml-10">
          <p className="font-semibold mb-2 text-xl font-medium mb-3">
            Patient Resources
          </p>
          <ul className="space-y-1 flex-col gap-3 text-white">
            <li>How It Works</li>
            <li>Find a Doctor</li>
            <li>Patient Stories</li>
            <li>Insurance Partners</li>
            <li>Download App(Play Store/App Store)</li>
          </ul>
        </div>
        <div className="justify-center ml-10">
          <p className="font-semibold mb-2 text-xl font-medium mb-3">
            Quick Links
          </p>
          <ul className="space-y-1 flex flex-col gap-0 text-white">
            <li>Home</li>
            <li>Book Appointment</li>
            <li>Specialities</li>
            <li>Health Packages</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="ml-10">
          <p className="font-semibold mb-2 text-xl font-medium mb-3 ">
            Contact
          </p>
          <ul className="space-y-1 flex-col gap-3 text-white">
            <li>Help Center</li>
            <li>+91 9026629163</li>
            <li>singhananya2225@gmail.com</li>
            <li>Prayagraj, India</li>
            <li>Feedback</li>
          </ul>
        </div>

        <div className="ml-10 sm:ml-10 md:ml-10 lg:ml-10">
          <p className="font-semibold mb-2 text-xl font-medium mb-3">About</p>
          <ul className="space-y-1 flex-col gap-3 text-white">
            <li>About us</li>
            <li>Services</li>
            <li>Blog/News</li>
            <li>Our Doctors</li>
            {/* <li>Contact us</li> */}
            <li>Privacy policy</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center border-t mt-0 pt-2">
          Copyright @ 2025 DocNest. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
