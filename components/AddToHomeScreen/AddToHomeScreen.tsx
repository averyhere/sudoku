"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setCookie, getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import { PiAndroidLogoDuotone, PiAppleLogoDuotone } from "react-icons/pi";

const ModuleLoading = () => (
  <p className="animate-bounce text-white font-bold">Loading...</p>
);
const AddToIosSafari = dynamic(() => import("./AddToIosSafari"), {
  loading: () => <ModuleLoading />,
});
const AddToMobileChrome = dynamic(() => import("./AddToMobileChrome"), {
  loading: () => <ModuleLoading />,
});
const AddToMobileFirefox = dynamic(() => import("./AddToMobileFirefox"), {
  loading: () => <ModuleLoading />,
});
const AddToMobileFirefoxIos = dynamic(() => import("./AddToMobileFirefoxIos"), {
  loading: () => <ModuleLoading />,
});
const AddToMobileChromeIos = dynamic(() => import("./AddToMobileChromeIos"), {
  loading: () => <ModuleLoading />,
});
const AddToSamsung = dynamic(() => import("./AddToSamsung"), {
  loading: () => <ModuleLoading />,
});
const AddToOtherBrowser = dynamic(() => import("./AddToOtherBrowser"), {
  loading: () => <ModuleLoading />,
});

import useUserAgent from "@/hooks/useUserAgent";

type AddToHomeScreenPromptType =
  | "safari"
  | "chrome"
  | "firefox"
  | "other"
  | "firefoxIos"
  | "chromeIos"
  | "samsung"
  | "desktop"
  | "";
const COOKIE_NAME = "addToHomeScreenPrompt";

export function AddToHomeScreen() {
  const [displayPrompt, setDisplayPrompt] =
    useState<AddToHomeScreenPromptType>("");
  const { userAgent, isMobile, isStandalone, isIOS, isAndroid } =
    useUserAgent();
  const addToHomeScreenPromptCookie = getCookie(COOKIE_NAME);
  const [isOpen, setIsOpen] = useState<boolean>(
    addToHomeScreenPromptCookie === "dontShow" ? false : true,
  );

  // const closePrompt = () => {
  //   setDisplayPrompt("");
  // };

  const doNotShowAgain = () => {
    // Create date 1 year from now
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    setCookie(COOKIE_NAME, "dontShow", { expires: date }); // Set cookie for a year
    handleOpenChange();
  };

  useEffect(() => {
    if (addToHomeScreenPromptCookie !== "dontShow") {
      // Only show prompt if user is on mobile and app is not installed
      if (isMobile && !isStandalone) {
        if (userAgent === "Safari") {
          setDisplayPrompt("safari");
        } else if (userAgent === "Chrome") {
          setDisplayPrompt("chrome");
        } else if (userAgent === "Firefox") {
          setDisplayPrompt("firefox");
        } else if (userAgent === "FirefoxiOS") {
          setDisplayPrompt("firefoxIos");
        } else if (userAgent === "ChromeiOS") {
          setDisplayPrompt("chromeIos");
        } else if (userAgent === "SamsungBrowser") {
          setDisplayPrompt("samsung");
        } else {
          setDisplayPrompt("other");
        }
      } else if (!isMobile) {
        setDisplayPrompt("desktop");
      }
    } else {
    }
  }, [userAgent, isMobile, isStandalone, isIOS, addToHomeScreenPromptCookie]);

  const Prompt = () => (
    <>
      {
        {
          safari: <AddToIosSafari />,
          chrome: <AddToMobileChrome />,
          firefox: <AddToMobileFirefox />,
          firefoxIos: <AddToMobileFirefoxIos />,
          chromeIos: <AddToMobileChromeIos />,
          samsung: <AddToSamsung />,
          other: <AddToOtherBrowser />,
          desktop: <></>,
          "": <></>,
        }[displayPrompt]
      }
    </>
  );

  if (
    displayPrompt === "desktop" ||
    displayPrompt === "other" ||
    displayPrompt === ""
  ) {
    return null;
  }

  const handleOpenChange = () => {
    const mainElement = document.getElementById("main-content") as HTMLElement;
    setIsOpen(!isOpen);
    if (!isOpen) {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      setCookie(COOKIE_NAME, "dontShow", { expires: date }); // Set cookie for a year
    }
    mainElement.focus();
  };

  return (
    <>
      <Drawer defaultOpen={isOpen}>
        <DrawerTrigger
          className="cursor-pointer"
          onClick={() => handleOpenChange()}
          asChild
        >
          <Button variant="outline">
            {isAndroid && <PiAndroidLogoDuotone className="size-4" />}
            {isIOS && <PiAppleLogoDuotone className="size-4" />}
            Add this App to your Home Screen
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="relative flex flex-col items-center justify-center">
              <Badge>New!</Badge>
              Play offline!
            </DrawerTitle>
            <DrawerDescription className="text-balance px-4">
              For the best experience, and to play offline, we recommend adding
              the Sudoku app to your home screen.
            </DrawerDescription>
          </DrawerHeader>
          <Prompt />
          <DrawerFooter>
            <Button variant="link" onClick={doNotShowAgain}>
              Do not show again
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
