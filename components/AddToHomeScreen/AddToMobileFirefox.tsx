import React from "react";
import Image from "next/image";

import { HiDotsVertical } from "react-icons/hi";
import ffIcon from "@/assets/images/firefox-install.png";

export default function AddToMobileFirefox() {
  return (
    <>
      <div className="flex gap-2 items-center text-lg">
        <p>Click the</p>
        <HiDotsVertical className="text-4xl" />
        <p>icon</p>
      </div>
      <div className="flex flex-col gap-2 items-center text-lg w-full px-4">
        <p>Scroll down and then click:</p>
        <div className="bg-zinc-50 flex items-center justify-around w-full px-4 py-2 rounded-lg text-zinc-900">
          <div className="flex gap-6 items-center">
            <Image
              src={ffIcon}
              alt="Firefox install icon"
              width={32}
              height={32}
            />
            <p>Install</p>
          </div>
        </div>
      </div>
    </>
  );
}
