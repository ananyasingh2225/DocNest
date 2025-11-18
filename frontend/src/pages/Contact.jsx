import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-700">
        <p>CONTACT US</p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-6 mb-28">
        <img
          className="w-4/5 max-w-[320px] md:max-w-[360px] mx-auto md:mx-0"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center items-start w-full md:w-auto px-4 sm:px-6">
          <div className="pb-1">
            <h2 className="font-semibold text-xl text-gray-700 mb-1">
              Our Office
            </h2>
            <p className="text-gray-600 mb-1">
              245c/20 Preetan Nagar, <br /> Prayagraj , Uttar Pradesh.
            </p>
            <p className="text-gray-600 mb-1">
              Mob.No.: +91 9026629163 <br /> Email: singhananya2225@gmail.com
            </p>
          </div>
          <hr className="w-full border-t border-gray-300 my-3" />
          <div>
            <p className="font-semibold text-xl text-gray-600 leading-tight mt-1">
              Careers at DocNest
            </p>
            <p className="text-gray-600 mt-0 mb-2">
              Learn more about our teams and job openings.
            </p>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
