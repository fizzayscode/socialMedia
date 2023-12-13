import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const image = result.user.photoURL;
      dispatch(signInStart());
      toast.loading("signing in user", { id: "google" });
      const data = await axios.post(
        "http://localhost:8080/api/v1/user/google-auth",
        {
          email,
          image,
        }
      );
      if (data.success === false) {
        dispatch(signInFailure());
        toast.error(data.message, { id: "google" });
      }

      dispatch(signInSuccess(data));
      navigate("/");
      toast.success("signed in successfully", { id: "google" });
    } catch (e) {
      dispatch(signInFailure());
      toast.error(e.response.data.message, { id: "google" });
    }
  };
  return (
    <div className="flex bg-red-700 py-2 text-white items-center w-full justify-center rounded gap-2">
      <FcGoogle />
      <button
        onClick={handleGoogleLogin}
        className="font-semibold"
        type="button"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Oauth;
