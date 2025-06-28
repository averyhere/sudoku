import React from "react";
import Link from "next/link";

export default function AddToOtherBrowser() {
  const searchUrl = `https://www.google.com/search?q=add+to+home+screen+for+common-mobile-browsers`;

  return (
    <div className="flex flex-col gap-4 items-center text-lg">
      <p>
        Unfortunately, we were unable to determine which browser you are using.
        Please search for how to install a web app for your browser.
      </p>
      <Link className="text-blue-300" href={searchUrl} target="_blank">
        Try This Search
      </Link>
    </div>
  );
}
