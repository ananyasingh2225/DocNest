import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);
  //const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Login failed!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-[90%] max-w-md "
      >
        <div className=" text-blue-700 mb-8">
          <p className="text-center font-semibold text-gray-800 text-2xl mb-6 ">
            {state} Login
          </p>
          <div className=" w-full mb-4 mt-4">
            {/* <p className="block text-gray-700 font-medium mb-2">Email</p> */}
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder="Email"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 rounded-lg px-4 py-2 outline-none transition"
            />
          </div>
          <div className="w-full mb-6">
            {/* <p className="block text-gray-700 font-medium mb-2">Password</p> */}
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder="Password"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 rounded-lg px-4 py-2 outline-none transition"
            />
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200">
            Login{" "}
          </button>
          {state === "Admin" ? (
            <p className="text-gray-500 mt-4">
              Doctor Login?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Doctor")}
              >
                Click Here
              </span>
            </p>
          ) : (
            <p className="text-gray-500 mt-4">
              Admin Login?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Admin")}
              >
                Click Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
