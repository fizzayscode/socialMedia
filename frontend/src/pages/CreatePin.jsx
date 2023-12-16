import React, { useEffect, useState } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

// title       String
// about       String
// destination String
// category    String
// image       String
const CreatePin = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePercentage, setFilePercentage] = useState(0);
  const [pin, setPin] = useState({
    title: "",
    about: "",
    destination: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "category") {
      setPin({ ...pin, category: selectedValue });
    }
    setPin({ ...pin, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (file) => {
    setFileUploadError(false);
    const storage = getStorage(app);
    // if someone upload the same file twice we want to make every picture unique
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    // want to see the percentage of our upload by usingn  this uploadBytesResumable
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
          setPin({ ...pin, image: downloadurl });
          setLoading(false);
        });
      }
    );
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pin);

    try {
      toast.loading("Posting your pin", { id: "pin" });
      const data = await axios.post("http://localhost:8080/api/v1/pins", pin);
      if (data.success === false) {
        toast.error(data.message, { id: "login" });
      }
      toast.success("Posted your pin", { id: "pin" });
      navigate("/");
    } catch (e) {
      toast.error("something went wrong", { id: "pin" });
    }
  };
  return (
    <>
      <h1 className="text-center font-bold text-lg mb-3">Post a new Pin</h1>
      <form
        onSubmit={handleSubmit}
        className="flex mt-20 p-3 flex-col md:flex-row items-center justify-between max-w-2xl mx-auto border border-gray-700 rounded-lg"
      >
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <p className=" text-gray-700 font-semibold ">title: </p>
              <input
                className="outline-none focus-within:shadow-lg py-1 w-full rounded-lg mx-2"
                type="text"
                name="title"
                value={pin.title}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 items-center">
              <p className=" text-gray-700 font-semibold ">about: </p>
              <input
                className="outline-none focus-within:shadow-lg py-1 w-full rounded-lg mx-2"
                type="text"
                name="about"
                value={pin.about}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 items-center">
              <p className=" text-gray-700 font-semibold ">destination:</p>
              <input
                className="outline-none focus-within:shadow-lg py-1 w-full rounded-lg mx-2"
                type="text"
                name="destination"
                value={pin.destination}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 items-center">
              <p className=" text-gray-700 font-semibold ">Category: </p>
              <select
                className="p-2 outline-none rounded-lg"
                name="category"
                // value={pin.category}
                onChange={handleChange}
                id=""
                defaultValue={"coding"}
              >
                <option value="coding">Coding</option>
                <option value="fashion">Fashion</option>
                <option value="Travel">Travel</option>
                <option value="health_and_fitness">Health and Fitness</option>
                <option value="wallpaper">Wallpapers</option>
                <option value="Photography">Photography</option>
                <option value="anime">Anime</option>
                <option value="animal">Animals</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex self-center md:self-start py-4 md:py-0 flex-col items-center justify-center">
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(file);
            }}
            accept="image/*"
          />
          {file ? (
            loading ? (
              <span className="text-green-700 font-bold  rounded-lg text-xs py-2 px-2 ">
                Uploading...
              </span>
            ) : (
              <span className="rounded-lg text-xs font-bold   py-2 px-2 text-green-700  ">
                Uploaded
              </span>
            )
          ) : (
            ""
          )}

          <div className="">
            {fileUploadError ? (
              <p className="text-xs text-red-500">
                something went wrong uploading file try again
              </p>
            ) : (
              <img className="w-full m-2 rounded-2xl" src={pin.image} alt="" />
            )}
          </div>
          <button
            disabled={loading}
            className=" disabled:bg-gray-500 border border-blue-700 py-2 px-1 font-semibold text-xs w-full rounded-lg hover:bg-blue-700 hover:text-white transition-all ease-in-out active:bg-blue-900"
            type="submit"
          >
            POST PIN
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePin;
