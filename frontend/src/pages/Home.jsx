import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import Sidebar from "../components/Sidebar";
import Pins from "../components/Pins";
import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import Profile from "./Profile";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={currentUser} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className=" p-2 shadow-md flex justify-between w-full flex-row ">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to={"/"}>
            <img src={Logo} className="w-[50px]" alt="" />
          </Link>
          <Link to={`/profile:/${currentUser?.id}`}>
            <img
              src={currentUser?.image}
              className="w-[40px] rounded-full"
              alt=""
            />
          </Link>
        </div>
        {toggleSidebar ? (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto z-10 animate-slide-in shadow-md">
            <div className=" left-0 absolute w-full justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={25}
                className="float-right inline"
                onClick={() => setToggleSidebar(false)}
              />
              <Sidebar user={currentUser} setToggle={setToggleSidebar} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path={`/profile:/${currentUser?.id}`} element={<Profile />} />
          <Route path={`/*`} element={<Pins user={currentUser} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
