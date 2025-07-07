import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { NewGameButton } from "@/components/Sudoku/new-game-button";
import { ScoreboardButton } from "@/components/Sudoku/scoreboard";

export function Header() {
  return (
    <header>
      <div className="w-full mx-auto py-4 flex gap-2 justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2">
            <h1 className="flex text-2xl md:text-4xl uppercase leading-none">
              <Link
                href="/"
                className="hover:underline transition-all text-foreground underline-offset-4 decoration-2 decoration-blue hover:text-pink"
              >
                Sudoku
              </Link>
            </h1>
          </div>
          <NewGameButton
            variant="link"
            size="xs"
            className="!text-foreground hover:!text-pink decoration-2"
          >
            New Game
          </NewGameButton>
          <ScoreboardButton
            variant="link"
            size="xs"
            className="!text-foreground hover:!text-pink decoration-2"
          >
            Scoreboard
          </ScoreboardButton>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            className="hidden md:inline hover:text-pink"
            href="https://github.com/averyhere/sudoku"
            target="_blank"
          >
            <Github className="size-6" />
            <span className="sr-only">GitHub</span>
          </Link>
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
