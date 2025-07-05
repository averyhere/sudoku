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
          <DialogClose>Cancel</DialogClose>
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
    <>
      <div className="flex flex-row gap-8 justify-center">
        <Button onClick={() => handleSelection("easy")}>Easy*</Button>
        <Button onClick={() => handleSelection("medium")}>Medium</Button>
        <Button onClick={() => handleSelection("hard")}>Hard</Button>
        <Button onClick={() => handleSelection("expert")}>Expert</Button>
      </div>
      <p className="text-xs text-center my-1">
        <em>*Easy difficulty does not track errors</em>.
      </p>
    </>
  );
}
