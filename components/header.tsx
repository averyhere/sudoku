import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { AveryOndoLogo } from "@/components/logos";
import { NewGameButton } from "@/components/Sudoku/new-game-button";
import { ScoreboardButton } from "@/components/Sudoku/scoreboard";

const ExternalLinks = [
  {
    label: (
      <>
        <Github className="size-6" />
        <span className="sr-only">GitHub</span>
      </>
    ),
    href: "https://github.com/averyhere/sudoku",
  },
];

export function Header() {
  return (
    <header>
      <div className="w-full mx-auto py-4 flex gap-2 justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-end">
            <h1 className="flex text-4xl uppercase leading-none">
              <Link href="/" className="hover:underline">
                Sudoku
              </Link>
            </h1>
            <div className="flex gap-1 items-start">
              <small className="text-xs text-foreground/40 leading-1">by</small>
              <Link href="https://averyondo.com" target="_blank">
                <AveryOndoLogo
                  variant="horizontal"
                  className="h-4 w-auto mr-2"
                />
              </Link>
            </div>
          </div>

          <NewGameButton variant="link">New Game</NewGameButton>
          <ScoreboardButton variant="link">Scoreboard</ScoreboardButton>
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
      </div>
      {/* <div className="w-full mb-4 flex gap-4 items-center justify-end">
        <NewGameButton variant="default">New Game</NewGameButton>
        <ScoreboardButton variant="default">Scoreboard</ScoreboardButton>
      </div> */}
    </header>
  );
}
