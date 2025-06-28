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
import { Button } from "./ui/button";
import { useState } from "react";
import { useGameStore } from "@/hooks/useGameStore";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";

export function NewGameButton() {
  const { newGame } = useGameStore();
  const [open, setOpen] = useState(false);

  function handleSelection(value: Difficulty) {
    newGame(value);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Start a new game</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-4">
            Select a difficulty to begin:
          </DialogTitle>
          <ToggleGroup
            type="single"
            variant="outline"
            className="flex w-full"
            size="lg"
            onValueChange={(value: Difficulty) => handleSelection(value)}
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
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
