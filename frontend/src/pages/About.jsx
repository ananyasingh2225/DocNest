import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-800 ">
        <p>
          ABOUT <span>US</span>
        </p>
      </div>
      <div className="ml-6 mr-6 my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-4 md:w-3/5 text-sm text-gray-700 text-justify">
          <p>
            At DocNest, we believe that quality healthcare should be accessible,
            reliable, and convenient for everyone. Our platform is designed to
            bridge the gap between patients and trusted medical professionals,
            ensuring that expert care is always within reach. With just a few
            clicks, you can connect with verified doctors, book appointments,
            and take control of your health journey — all in one place.
          </p>
          <p>
            We partner with a wide network of qualified and experienced doctors
            across multiple specialties to provide care that is safe,
            transparent, and affordable. Whether you’re seeking routine
            check-ups, specialist consultations, or timely medical advice,
            DocNest empowers you to make informed health decisions with ease.
            Every feature — from appointment booking to secure data handling —
            is built with trust, privacy, and patient comfort in mind.
          </p>
          <b className="text-lg">Our Vision</b>
          <p>
            Our vision is to create a digital healthcare ecosystem that not only
            simplifies the way patients access care but also helps doctors serve
            better. With real-time slot availability, clear consultation fees,
            and seamless communication, DocNest is more than just an appointment
            booking app — it’s a trusted health companion designed for today’s
            fast-paced world.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          <span className="text-gray-700 font-semibold p-6">
            {" "}
            WHY CHOOSE US{" "}
          </span>
        </p>
      </div>
      <div className=" flex flex-col md:flex-row mb-20 p-6 gap-4">
        <div className=" border px-4 md:px-4 py-4 sm:py-4 flex flex-col gap-3  text-[15px] hover:bg-primary hover:text-white rounded-lg transition-all duration-300 text-gray-700 cursor-pointer">
          <b className="text-lg">Consistency:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className=" border px-4 md:px-4 py-4 sm:py-4 flex flex-col gap-3  text-[15px] hover:bg-primary hover:text-white rounded-lg transition-all duration-300 text-gray-700 cursor-pointer ">
          <b className="text-lg">Efficiency:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className=" border px-4 md:px-4 py-4 sm:py-4 flex flex-col gap-3  text-[15px] hover:bg-primary hover:text-white rounded-lg transition-all duration-300 text-gray-700 cursor-pointer ">
          <b className="text-lg">Personalization:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
