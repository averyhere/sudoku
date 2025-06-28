import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { AveryOndoLogo } from "@/components/logos";
import { ScoreboardButton } from "@/components/Scoreboard";

export function Header() {
  return (
    <>
      <header className="w-full md:max-w-sm mx-auto my-4">
        <div className="flex gap-2 justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Sudoku</h1>
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
          <div>
            <div className="flex justify-end gap-2 mb-2">
              <ThemeToggle />
              <Button asChild size="icon" variant="ghost">
                <Link
                  href="https://github.com/averyhere/sudoku"
                  target="_blank"
                >
                  <Github className="size-4" />
                </Link>
              </Button>
              <ScoreboardButton />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
