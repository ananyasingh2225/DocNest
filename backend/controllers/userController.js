import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    //hashing user pw
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    // res.status(201).json({
    //   success: true,
    //   message: "User registered successfully",
    //   user,
    // });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "7d",
    // });
    res.json({
      success: true,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};
//API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to get user profile data
const getProfile = async (req, res) => {
  try {
    //const { userId } = req.body;
    const userId = req.user.userId;
    const userData = await userModel.findById(userId).select("-password");
    //const user = await User.findById(userId).select("-password");
    res.json({ success: true, user: userData });

    // if (!userData) {
    //   return res.json({ success: false, message: "User not found" });
    // }
    // res.json({ success: true, userData });
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to update user profile data
const updateProfile = async (req, res) => {
  try {
    //const { userId, name, phone, address, dob, gender } = req.body;
    const userId = req.user.userId;
    const { name, phone, dob, gender, address } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !gender || !dob) {
      return res.json({ success: false, message: "Fill all the fields" });
    }
    let parsedAddress = {};
    if (address) {
      try {
        parsedAddress = JSON.parse(address);
      } catch (err) {
        return res.json({ success: false, message: "Invalid address format" });
      }
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    });
    if (imageFile) {
      //upload image to cloudinary
      //const base64String = imageFile.buffer.toString("base64");
      //const dataURI = `data:${imageFile.mimetype};base64,${base64String}`;

      //   try {
      //     const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      //       //resource_type: "image",
      //       folder: "users",
      //     }
      //   async (error, result) => {
      //     if (error) {
      //     console.log(error);
      //     return res.json({ success: false, message: "Cloudinary upload failed" });
      //   }

      //     await userModel.findByIdAndUpdate(userId, {
      //       image: imageUpload.secure_url,
      //     });
      //   // catch (error) {
      //   //   console.log(error);
      //     return res.json({
      //       success: true,
      //       message: "Profile updated",
      //     });
      //   }
      // )
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "users" },
        async (error, result) => {
          if (error) {
            console.log(error);
            return res.json({
              success: false,
              message: "Cloudinary upload failed",
            });
          }

          await userModel.findByIdAndUpdate(userId, {
            image: result.secure_url,
          });

          return res.json({
            success: true,
            message: "Profile updated successfully",
          });
        }
      );

      uploadStream.end(imageFile.buffer); // upload Buffer (memoryStorage)
    } else {
      return res.json({
        success: true,
        message: "Profile updated successfully",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }

  //return res.json({ success: true, message: "Profile updated successfully" });
  // }) catch (error) {
  //   res.json({ success: false, message: error.message });
  // }
};
//API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor is not available" });
    }
    let slots_booked = docData.slots_booked || {};
    //checking for slots availability
    //if (slots_booked[slotDate]) {
    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = []; // create array if empty
    }
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.json({
        success: false,
        message: "Slot not available. Please choose another slot.",
      });
    }
    // if (!slots_booked[slotDate]) {
    //   slots_booked[slotDate] = [];
    // }
    slots_booked[slotDate].push(slotTime);
    //slots_booked[slotDate].push(slotTime);
    // else {
    //   slots_booked[slotDate].push(slotTime);
    // }
    //} else {
    // slots_booked[slotDate] = [];
    // slots_booked[slotDate].push(slotTime);
    //slots_booked[slotDate] = [slotTime];
    //}
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    const userData = await userModel.findById(userId).select("-password");
    //delete docData.slots_booked;
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //save new slots data in docData
    //await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to book appointment" });
  }
};

//api to get user appointments can be added here
const listAppointments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//api to cancel appointment can be added here
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized action" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;
    const docData = await doctorModel.findById(docId).select("-password");
    let slots_booked = docData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    return res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
//api to make payment can be added here for razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    // const userId = req.user.userId;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    //creating options for razorpay payment
    const options = {
      amount: appointmentData.amount * 100, // amount in the smallest currency unit
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };
    //creating order
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//api to verify payment can be added here
const verifyRazorpay = async (req, res) => {
  try {
    console.log("Verify API reached"); // debugging
    console.log("BODY:", req.body);
    const { razorpay_payment_id } = req.body;
    const { razorpay_order_id } = req.body;
    const { razorpay_signature } = req.body;
    if (!razorpay_order_id) {
      return res.json({ success: false, message: "razorpay_order_id missing" });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    //console.log("ORDER:", orderInfo);
    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment successful" });
    } else {
      res.json({ success: false, message: "Payment not completed" });
    }

    //const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    //console.log(orderInfo);
    //const { razorpay_order_id } = req.body;
    //const { razorpay_signature } = req.body;
  } catch (error) {
    console.log("VERIFY ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
};
