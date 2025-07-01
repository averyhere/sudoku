import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { AveryOndoLogo } from "@/components/logos";

const MenuItems = [
  {
    label: "Play Sudoku",
    href: "/sudoku",
  },
  // {
  //   label: "Play Tic-Tac-Toe",
  //   href: "/tic-tac-toe",
  // },
];

const ExternalLinks = [
  {
    label: (
      <>
        <Github className="size-4" />
        <span>GitHub</span>
      </>
    ),
    href: "https://github.com/averyondo/time-passer",
  },
];

export function Header() {
  return (
    <header className="w-full mx-auto py-4 flex gap-2 justify-between items-center">
      <div className="flex gap-4">
        <div>
          <h1 className="text-xl font-bold">
            <Link href="/" className="hover:underline">
              Time Passer
            </Link>
          </h1>
          <div className="flex gap-1 items-start">
            <small className="text-xs text-foreground/40 leading-1">by</small>
            <Link href="https://averyondo.com" target="_blank">
              <AveryOndoLogo variant="horizontal" className="h-4 w-auto mr-2" />
            </Link>
          </div>
        </div>
        <nav className="justify-self-start md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {MenuItems.map((item) => (
                <DropdownMenuItem key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {ExternalLinks.map((item) => (
                <DropdownMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    target="_blank"
                    className="inline-flex items-center gap-1"
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="hidden w-full justify-between md:flex">
          <nav className="flex justify-self-start">
            <ul className="flex gap-8 items-center">
              {MenuItems.map((item) => (
                <li key={item.href}>
                  <Button variant="ghost" asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <ul className="hidden md:flex gap-8">
          {ExternalLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="flex items-center gap-1">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </header>
  );
}
