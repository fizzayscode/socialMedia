import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Navbar = ({ setSearchTerm, searchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;
  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 gap-3 rounded-md border-none bg-white outline-none focus-within:shadow-md">
        <IoMdSearch fontSize={20} />
        <input
          className="outline-none py-2 w-full"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
          onFocus={() => {
            navigate("/search");
          }}
        />
      </div>
      <Link to={`/profile:/${user?.id}`} className="hidden md:flex gap-3 ">
        <img className="rounded-full w-[45px]" src={user.image} alt="user" />
      </Link>
      <Link
        className="bg-black text-white rounded-lg w-9 h-9 md:w-12 md:h-10 flex justify-center items-center"
        to={"create-pin"}
      >
        <IoMdAdd />
      </Link>
    </div>
  );
};

export default Navbar;
