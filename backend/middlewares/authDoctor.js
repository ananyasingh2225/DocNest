//import { messaging } from "firebase-admin";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//   });
// }
//doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    //const { token } = req.headers;
    // let token = req.headers.authorization || req.headers.token;
    // if (!token) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Not authorized login again",
    //   });
    // }
    // if (token.startsWith("Bearer ")) {
    //   token = token.split(" ")[1];
    // }
    // const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // // if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    // //   return res.json({
    // //     success: false,
    // //     message: "Not authorized login again",
    // //   });
    // // }
    // req.body.userId = token_decode.id;
    // next();
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized ,no token",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    // if (!decoded?.id) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid token payload",
    //   });
    // }

    // req.body.userId = decoded.id;
    req.doctor = { doctorId: decoded.id };
    next();
  } catch (error) {
    // console.log(error);
    // res
    //   .status(401)
    //   .json({ success: false, message: "Not authorized login again" });
    console.log("Auth Error:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Not authorized login again" });
  }
};

export default authDoctor;
