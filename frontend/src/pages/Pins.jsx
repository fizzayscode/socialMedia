import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Feed from "./Feed";
import PinDetails from "./PinDetails";
import CreatePin from "./CreatePin";
import Search from "./Search";

const Pins = ({ user }) => {
  // we want to share this search accross multiple components
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path={"/"} element={<Feed />} />
          <Route path={"/category/:id"} element={<Feed />} />
          <Route
            path={"/pin-detail/:id"}
            element={<PinDetails user={user} />}
          />
          <Route path={"/create-pin"} element={<CreatePin />} />
          <Route
            path={"/search"}
            element={
              <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
