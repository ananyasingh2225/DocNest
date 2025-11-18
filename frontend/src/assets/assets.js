import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
//import cloudinary_upload from "./cloudinary_upload.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import logo from "./logo.svg";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "General physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Manini Chhabra",
    image: doc1,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Chhabra has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Chhabra has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 500,
    address: {
      line1: "Paramount Tulip",
      line2: "Delhi Road, Saharanpur",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Ayushi Singh",
    image: doc2,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr.Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 600,
    address: {
      line1: "Vibhuti Khand, Gomti Nagar",
      line2: "Lucknow",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Astha Kesarwani",
    image: doc3,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Kesarwani has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Kesarwani has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 300,
    address: {
      line1: "Sulem Sarai",
      line2: "Prayagraj",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Falak Rahman",
    image: doc4,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Rahman has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Rahman has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 400,
    address: {
      line1: "Manmohan Park",
      line2: "Prayagraj",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Binisha Thakur",
    image: doc5,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Thakur has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Thakur has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 500,
    address: {
      line1: "Mayur Vihar Phase 3",
      line2: "New Delhi",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Sameera Siddiqui",
    image: doc6,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Siddiqui has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Siddiqui has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 500,
    address: {
      line1: "Beli",
      line2: "Prayagraj",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Aditya Singh",
    image: doc7,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 500,
    address: {
      line1: "UP College Hostel",
      line2: "Varansi",
    },
  },
  {
    _id: "doc8",
    name: "Dr. Gargi Singh",
    image: doc8,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 600,
    address: {
      line1: "Dhoomanganj",
      line2: "Prayagraj",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Shambhavi Singh",
    image: doc9,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 300,
    address: {
      line1: "Dhoomanganj",
      line2: "Prayagraj",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Jeffrey King",
    image: doc10,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 400,
    address: {
      line1: "Raja Park",
      line2: "Jaipur",
    },
  },
  {
    _id: "doc11",
    name: "Dr. Alka Singh",
    image: doc11,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 500,
    address: {
      line1: "Smriti Apartment",
      line2: "Lucknow",
    },
  },
  {
    _id: "doc12",
    name: "Dr. KD Singh",
    image: doc12,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 499,
    address: {
      line1: "Dhoomanganj",
      line2: "Prayagraj",
    },
  },
  {
    _id: "doc13",
    name: "Dr. PD Singh",
    image: doc13,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 500,
    address: {
      line1: "Dhoomanganj",
      line2: "Prayagraj",
    },
  },
  {
    _id: "doc14",
    name: "Dr. Shatrughan Singh",
    image: doc14,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 600,
    address: {
      line1: "Raja Park",
      line2: "Jaipur",
    },
  },
  {
    _id: "doc15",
    name: "Dr. Sonmati Singh",
    image: doc15,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Singh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 300,
    address: {
      line1: "Dhoomanganj",
      line2: "Prayagraj",
    },
  },
];
