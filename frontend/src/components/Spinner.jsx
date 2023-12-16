import React, { useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <ThreeCircles
        height="100"
        width="120"
        color="#00BFFF"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
      <p className="text-lg text-center px-2 pt-4">{message}</p>
    </div>
  );
};

export default Spinner;
