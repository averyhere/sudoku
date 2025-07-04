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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
      <ToggleGroup
        type="single"
        variant="outline"
        className="flex w-full"
        size="lg"
        onValueChange={(value: Difficulty) => handleSelection(value)}
      >
        <ToggleGroupItem className="cursor-pointer" value="easy">
          Easy*
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
      <p className="text-xs text-center my-1">
        <em>*Easy difficulty does not track errors</em>.
      </p>
    </>
  );
}
