import React from "react";

import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { FiShare } from "react-icons/fi";

export default function AddToMobileFirefoxIos() {
  return (
    <>
      <div className="flex gap-2 items-center text-lg">
        <p>Click the</p>
        <FaBars className="text-4xl" />
        <p>icon</p>
      </div>
      <div className="flex flex-col gap-2 items-center text-lg w-full px-4">
        <p>Scroll down and then click:</p>
        <div className="bg-zinc-800 flex items-center justify-between w-full px-8 py-2 rounded-lg">
          <p>Share</p>
          <FiShare className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center text-lg w-full px-4">
        <p>Then click:</p>
        <div className="bg-zinc-800 flex items-center justify-between w-full px-8 py-2 rounded-lg">
          <p>Add to Home Screen</p>
          <AiOutlinePlusSquare className="text-2xl" />
        </div>
      </div>
    </>
  );
}
