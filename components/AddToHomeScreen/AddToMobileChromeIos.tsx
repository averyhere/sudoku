import React from "react";

import { AiOutlinePlusSquare } from "react-icons/ai";
import { TbShare2 } from "react-icons/tb";

export default function AddToMobileChromeIos() {
  return (
    <>
      <div className="flex gap-2 items-center text-lg">
        <p>Click the</p>
        <TbShare2 className="text-4xl" />
        <p>icon</p>
      </div>
      <div className="flex flex-col gap-2 items-center text-lg w-full px-4">
        <p>Scroll down and then click:</p>
        <div className="bg-zinc-50 flex justify-between items-center w-full px-4 py-2 rounded-lg text-zinc-900">
          <p>Add to Home Screen</p>
          <AiOutlinePlusSquare className="text-2xl" />
        </div>
      </div>
    </>
  );
}
