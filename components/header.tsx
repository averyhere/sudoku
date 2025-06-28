"use client";

import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";
import Link from "next/link";

export function Header() {
  const { newGame } = useGameStore();
  const [showNewGameDialog, setShowNewGameDialog] = useState(false);

  const handleNewGame = (value: Difficulty) => {
    newGame(value);
    setShowNewGameDialog(false);
  };

  return (
    <>
      <header className="w-full md:max-w-sm mx-auto my-4">
        <div className="flex gap-2 justify-between items-center">
          <h1 className="text-2xl font-bold">Sudoku</h1>
          <div className="flex gap-2">
            <Button onClick={() => setShowNewGameDialog(true)} size="sm">
              New Game
            </Button>
            <ThemeToggle />
            <Button asChild size="icon" variant="ghost">
              <Link href="https://github.com/averyhere/sudoku" target="_blank">
                <Github className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <Dialog defaultOpen={showNewGameDialog} open={showNewGameDialog}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-center mb-4">
              Select a difficulty to begin:
            </DialogTitle>
            <ToggleGroup
              type="single"
              variant="outline"
              className="flex w-full"
              onValueChange={(value) => handleNewGame(value as Difficulty)}
            >
              <ToggleGroupItem className="cursor-pointer" value="easy">
                Easy
              </ToggleGroupItem>
              <ToggleGroupItem className="cursor-pointer" value="medium">
                Medium
              </ToggleGroupItem>
              <ToggleGroupItem className="cursor-pointer" value="hard">
                Hard
              </ToggleGroupItem>
              <ToggleGroupItem className="cursor-pointer" value="expert">
                Expert
              </ToggleGroupItem>
            </ToggleGroup>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
