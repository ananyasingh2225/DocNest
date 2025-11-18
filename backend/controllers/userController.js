import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
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
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot not available. Please choose another slot.",
        });
      }
      slots_booked[slotDate].push(slotTime);
      // else {
      //   slots_booked[slotDate].push(slotTime);
      // }
    } else {
      // slots_booked[slotDate] = [];
      // slots_booked[slotDate].push(slotTime);
      slots_booked[slotDate] = [slotTime];
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;
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
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to book appointment" });
  }
};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment };
