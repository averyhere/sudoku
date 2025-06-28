import React from "react";

import { FaBars } from "react-icons/fa";
import { TfiPlus } from "react-icons/tfi";

export default function AddToSamsung() {
  return (
    <>
      <div className="flex gap-2 items-center text-lg">
        <p>Click the</p>
        <FaBars className="text-4xl" />
        <p>icon</p>
      </div>
      <div className="flex flex-col gap-2 items-center text-lg w-full px-4">
        <p>Scroll down and then click:</p>
        <div className="bg-white text-zinc-800 flex flex-col gap-2 items-center p-4 rounded-lg">
          <TfiPlus className="text-2xl" />
          <p>Add page to</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center text-lg w-full px-4">
        <p>Then select:</p>
        <div className="bg-white text-zinc-800 flex flex-col gap-2 items-center py-2 px-4 rounded-lg">
          <p>Home screen</p>
        </div>
      </div>
    </>
  );
}
