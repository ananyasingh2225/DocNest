import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import _Logo from "../assets/_Logo.png";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const modeParam = searchParams.get("mode");
  const [mode, setMode] = useState(
    modeParam === "Sign Up" ? "Sign Up" : "Login"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setMode(modeParam === "Sign Up" ? "Sign Up" : "Login");
  }, [modeParam]);

  const switchMode = () => {
    const newMode = mode === "Sign Up" ? "Login" : "Sign Up";
    setMode(newMode);
    setSearchParams({ mode: newMode });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Registration successful");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Authentication unsuccessful", error);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-10 ">
      <form
        onSubmit={handleSubmit}
        className=" bg-white p-6 shadow-lg rounded-xl border rounded-md w-[350px] sm:w-[400px]"
      >
        <div className="flex justify-center mb-6">
          <img src={_Logo} alt="DocNest Logo" className="w-20 h-20" />
        </div>
        <div className="text-2xl font-bold mb-2 text-center text-gray-800">
          {mode === "Sign Up" ? "Create Account" : "Login"}
        </div>
        {mode === "Sign Up" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 mb-2 border rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-2 border rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-medium transition-all"
        >
          {mode === "Sign Up" ? "Sign Up" : "Login"}
        </button>
        <p
          onClick={switchMode}
          className="text-sm mt-6 cursor-pointer text-gray-700 text-center"
        >
          {mode === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span className="text-blue-700 font-semibold underline underline-offset-2 hover:text-blue-800 hover:underline transition-colors">
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account ?{" "}
              <span className="text-blue-700 font-semibold underline underline-offset-2  hover:text-blue-800 hover:underline transition-colors ">
                Create Account
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
