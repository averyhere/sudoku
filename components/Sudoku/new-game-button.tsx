"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { useSudokuGameStore } from "@/hooks/useSudokuGameStore";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";
import { ButtonProps } from "../ui/button";

export function NewGameButton({
  children,
  ...props
}: ButtonProps & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} {...props}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-4">
            Select a difficulty to begin:
          </DialogTitle>
          <DifficultySelector onSelect={() => setOpen(false)} />
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DifficultySelector({
  onSelect,
}: {
  onSelect?: (value: Difficulty) => void;
}) {
  const { newGame } = useSudokuGameStore();

  function handleSelection(value: Difficulty) {
    if (onSelect) onSelect(value);
    newGame(value);
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center">
        <Button size="lg" onClick={() => handleSelection("easy")}>
          Easy*
        </Button>
        <Button size="lg" onClick={() => handleSelection("medium")}>
          Medium
        </Button>
        <Button size="lg" onClick={() => handleSelection("hard")}>
          Hard
        </Button>
        <Button size="lg" onClick={() => handleSelection("expert")}>
          Expert
        </Button>
      </div>
      <p className="text-xs text-center mt-4 text-purple">
        <em>*Easy difficulty does not track mistakes</em>.
      </p>
    </div>
  );
}
