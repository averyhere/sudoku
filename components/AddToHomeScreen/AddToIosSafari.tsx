import React from "react";

import { TbShare2 } from "react-icons/tb";
import { AiOutlinePlusSquare } from "react-icons/ai";

export default function AddToIosSafari() {
  return (
    <>
      <div className="flex gap-2 items-center justify-center text-lg">
        <p>Tap the</p>
        <TbShare2 className="text-2xl" />
        <p>icon</p>
      </div>
      <div className="flex flex-col gap-2 items-center text-lg w-full px-4">
        <p>Scroll down and then tap:</p>
        <div className="bg-foreground/5 flex justify-between items-center w-full px-4 py-2 rounded-lg">
          <p>Add to Home Screen</p>
          <AiOutlinePlusSquare className="text-2xl" />
        </div>
      </div>
    </>
  );
}
