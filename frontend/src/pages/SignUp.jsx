import React, { useState } from "react";
import Oauth from "../components/Oauth";
import share from "../assets/share.mp4";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-white.png";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      toast.loading("signing up user", { id: "signup" });
      const data = await axios.post(
        "http://localhost:8080/api/v1/users/register",
        details
      );
      if (data.success === false) {
        dispatch(signInFailure());
        toast.error(data.message, { id: "signup" });
      }

      dispatch(signInSuccess(data));
      toast.success("signed Up successfully", { id: "signup" });
      navigate("/");
    } catch (e) {
      dispatch(signInFailure());
      toast.error(e.response.data.message, { id: "signup" });
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
            <div className="self-center pb-3 ">
              <img
                className="rounded-full w-[70px] object-cover text-white"
                src={Logo}
                alt=""
              />
            </div>
            <input
              className="outline-none py-2 px-2 border-2 rounded-lg my-1"
              type="text"
              placeholder="username..."
              onChange={handleChange}
              name="username"
              value={details.username}
            />
            <input
              className="outline-none py-2 px-2 b-1 border-2 rounded-lg my-1"
              type="email"
              placeholder="email..."
              onChange={handleChange}
              name="email"
              value={details.email}
            />
            <input
              className="outline-none py-2 px-2 b-1 border-2 rounded-lg my-1"
              type="password"
              placeholder="password..."
              onChange={handleChange}
              name="password"
              value={details.password}
            />
            <button className="w-full bg-blue-600 text-white my-3 p-2 rounded font-semibold">
              Sign Up
            </button>
            <Oauth />
          </form>
          <p className="text-white text-xs py-3">
            dont have an account?<Link to={"/login"}>sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
