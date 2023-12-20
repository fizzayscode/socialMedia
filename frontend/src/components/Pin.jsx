import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const Pin = ({ pin }) => {
  const navigate = useNavigate();
  const [postHovered, setPostHovered] = useState(false);
  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`pin-detail/${pin.id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img className="rounded-lg w-full" src={pin.image} alt="" />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-2"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${pin.image}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-full bg-white w-6 h-6 flex items-center justify-center text-dark text-l opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
