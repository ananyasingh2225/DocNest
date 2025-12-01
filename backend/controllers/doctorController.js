import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// Change availability
const changeAvailability = async (req, res) => {
  try {
    const { doctorId } = req.doctor;

    const docData = await doctorModel.findById(doctorId);
    await doctorModel.findByIdAndUpdate(doctorId, {
      available: !docData.available,
    });

    return res.json({ success: true, message: "Availability updated" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Get doctor list
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");
    return res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor)
      return res.json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Get appointments
const appointmentsDoctor = async (req, res) => {
  try {
    const { doctorId } = req.doctor;

    const appointments = await appointmentModel.find({ docId: doctorId });

    return res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Complete an appointment
const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { doctorId } = req.doctor;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData)
      return res.json({ success: false, message: "Appointment not found" });

    if (appointmentData.docId !== doctorId)
      return res.json({ success: false, message: "Not authorized" });

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });

    return res.json({ success: true, message: "Appointment Completed" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { doctorId } = req.doctor;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData)
      return res.json({ success: false, message: "Appointment not found" });

    if (appointmentData.docId !== doctorId)
      return res.json({ success: false, message: "Not authorized" });

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    return res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
//API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const { doctorId } = req.doctor;
    const appointments = await appointmentModel.find({ docId: doctorId });
    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });
    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.doctor;
    const profileData = await doctorModel
      .findById(doctorId)
      .select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//api to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.doctor;
    const { fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(doctorId, { fees, address, available });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
