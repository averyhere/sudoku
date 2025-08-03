import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NewGameButton } from "@/components/Sudoku/new-game-button";

export function Header() {
  return (
    <header className="w-full p-2">
      <div className="w-full max-w-4xl mx-auto py-4 flex gap-2 justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2">
            <h1 className="flex text-4xl md:text-4xl uppercase leading-none">
              <Link
                href="/"
                className="hover:underline transition-all text-foreground underline-offset-4 decoration-2 decoration-blue hover:text-pink"
              >
                Sudoku
              </Link>
            </h1>
          </div>
          <NewGameButton
            variant="default"
            size="sm"
            className="hidden md:inline-flex"
          >
            New Game
          </NewGameButton>
          <Button
            variant="default"
            size="sm"
            className="hidden md:inline-flex"
            asChild
          >
            <Link href="/scoreboard">Scoreboard</Link>
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            className="hover:text-pink"
            href="https://github.com/averyhere/sudoku.averyhere.com"
            target="_blank"
          >
            <Github className="size-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full mx-auto py-4 flex gap-2 pt-0 justify-between items-center md:hidden">
        <NewGameButton variant="default" size="sm">
          New Game
        </NewGameButton>
        <Button variant="default" size="sm" asChild>
          <Link href="/scoreboard">Scoreboard</Link>
        </Button>
      </div>
    </header>
  );
}
