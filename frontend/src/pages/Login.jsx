import React, { useState } from "react";
import Oauth from "../components/Oauth";
import share from "../assets/share.mp4";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      toast.loading("signing in user", { id: "login" });
      const data = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        details
      );
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        toast.error(data.message, { id: "login" });
      }
      console.log(data.data.user);
      dispatch(signInSuccess(data.data.user));
      toast.success("signed in successfully", { id: "login" });
      navigate("/");
    } catch (e) {
      dispatch(signInFailure(e.response.data.message));
      toast.error(e.response.data.message, { id: "login" });
    }
  };
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="relative min-h-screen flex align-middle items-center justify-center flex-col">
        <video
          className="absolute object-cover w-full h-full"
          type="video/mp4"
          loop
          muted
          autoPlay
          src={share}
        />
        <div className="bg-blackOverlay absolute inset-0"></div>
        <div className="absolute">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              className="outline-none py-2 px-2 b-1 border-2 rounded-lg my-1"
              type="email"
              placeholder="email..."
              onChange={handleChange}
              name="email"
            />
            <input
              className="outline-none py-2 px-2 b-1 border-2 rounded-lg my-1"
              type="password"
              placeholder="password..."
              onChange={handleChange}
              name="password"
            />
            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white my-3 p-2 rounded font-semibold hover:bg-blue-700"
            >
              Sign Up
            </button>
            <Oauth />
          </form>
          <p className="text-white text-xs py-3">
            dont have an account?{" "}
            <span className="text-blue-700 font-semibold">
              <Link to={"/register"}>sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
