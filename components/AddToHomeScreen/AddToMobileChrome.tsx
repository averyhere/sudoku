import React from "react";

import { HiDotsVertical } from "react-icons/hi";
import { MdAddToHomeScreen } from "react-icons/md";

export default function AddToMobileChrome() {
  return (
    <>
      <div className="flex gap-2 items-center text-lg">
        <p>Tap the</p>
        <HiDotsVertical className="text-4xl" />
        <p>icon</p>
      </div>
      <div className="flex flex-col gap-2 items-center text-lg w-full px-4">
        <p>Scroll down and then tap:</p>
        <div className="bg-zinc-50 flex justify-between items-center w-full px-4 py-2 rounded-lg text-zinc-900">
          <MdAddToHomeScreen className="text-2xl" />
          <p>Add to Home Screen</p>
        </div>
      </div>
    </>
  );
}
