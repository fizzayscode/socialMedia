import React from "react";

import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import Logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { IoMdExit } from "react-icons/io";

const categories = [
  {
    name: "animal",
  },
  {
    name: "wallpaper",
  },
  {
    name: "photography",
  },
  {
    name: "coding",
  },
  {
    name: "anime",
  },
  {
    name: "fashion",
  },
  {
    name: "travel",
  },
  {
    name: "health and fitness",
  },
  {
    name: "others",
  },
];

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 text-sm hover:text-black transition-all duration-200 ease-in-out capitalize";

const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold text-sm border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, setToggle }) => {
  const handleClose = () => {
    if (setToggle) {
      setToggle(false);
    }
  };
  return (
    <div className="flex justify-between flex-col h-screen pl-3 bg-white  min-w-210 hide-scrollbar scrolling-touch overflow-hidden overflow-y-scroll">
      <div className="flex flex-col align-top items-start justify-start">
        <div className="flex flex-col">
          <Link
            onClick={handleClose}
            to={"/"}
            className="flex px-1 gap-2 my-2 pt-1 w-190 items-center mb-4"
          >
            <img src={Logo} className="w-[40px] inline" alt="" />
            <p className="text-sm font-bold">SHARE-PICS</p>
          </Link>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <RiHomeFill /> Home
          </NavLink>
          <h3 className="mt-2 text-xs font-bold pl-3 ">Discover Categories</h3>

          {categories.slice(0, categories.length - 1).map((category, i) => {
            return (
              <NavLink
                key={i}
                to={
                  category.name.includes(" ")
                    ? `category/${category.name.replace(/ /g, "_")}`
                    : `category/${category.name}`
                }
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
              >
                {category.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between ml-[-0.75rem] p-3 text-xs font-bold hover:bg-black hover:text-white cursor-pointer">
        <IoMdExit fontSize={25} />
        <button>LOGOUT</button>
      </div>
    </div>
  );
};

export default Sidebar;
