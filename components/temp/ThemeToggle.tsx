"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleUpdateMetaTag = () => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (!document.querySelector('meta[name="theme-color"]')) {
      const metaThemeTag = document.createElement("meta");
      const metaThemeColor =
        theme === "dark"
          ? "#171717"
          : theme === "light"
            ? "#ffffff"
            : prefersDark
              ? "#171717"
              : "#ffffff";
      metaThemeTag.setAttribute("name", "theme-color");
      metaThemeTag.setAttribute("content", metaThemeColor);
      if (metaThemeColor) document.head.appendChild(metaThemeTag);
    } else {
      const metaThemeTag = document.querySelector(
        'meta[name="theme-color"]',
      ) as HTMLMetaElement;
      const metaThemeColor =
        theme === "dark" || prefersDark ? "#171717" : "#ffffff";
      metaThemeTag.setAttribute("content", metaThemeColor);
    }
  };

  React.useEffect(() => {
    handleUpdateMetaTag();
    // const metaThemeTag = document.createElement("meta");
    // const metaThemeColor =
    //   theme === "dark" ? "#171717" : theme === "light" ? "#ffffff" : "#66c7f1";
    // metaThemeTag.setAttribute("name", "theme-color");
    // metaThemeTag.setAttribute("content", "#ffffff");
    // document.head.appendChild(metaThemeTag);

    // // const metaThemeTag = document.querySelector('meta[name="theme-color"]');

    // metaThemeTag.setAttribute("content", metaThemeColor);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="hover:text-pink">
          <Sun className="size-6 dark:opacity-0" />
          <Moon className="absolute size-6 opacity-0 dark:opacity-100" />
          <span className="sr-only">Theme selector</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
