"use client";

import { formatTime } from "@/lib/utils";
import { useSudokuGameStore } from "@/hooks/useSudokuGameStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DifficultySelector } from "./new-game-button";

export function SudokuEndDialog() {
  const { difficulty, gameStatus, setGameStatus, timer, errorCount, reset } =
    useSudokuGameStore();

  return (
    <Dialog
      defaultOpen={gameStatus === "won" || gameStatus === "lost"}
      open={gameStatus === "won" || gameStatus === "lost"}
      onOpenChange={() => {
        setGameStatus(null);
        reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {gameStatus === "won"
              ? "You Won!"
              : "Oops! You made too many mistakes"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {gameStatus === "won"
              ? "Congratulations! You solved the puzzle."
              : "Better luck next time!"}
          </DialogDescription>
        </DialogHeader>
        <ul className="w-full flex gap-4 justify-center text-center text-sm text-foreground/80">
          <li className="flex flex-col">
            <span className="text-sm">Difficulty</span>
            <strong className="font-bold text-lg">
              <span className="capitalize">{difficulty}</span>
            </strong>
          </li>
          <li className="flex flex-col">
            <span className="text-sm">Time</span>
            <strong className="font-bold text-xl">{formatTime(timer)}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-sm">Mistakes</span>
            <strong className="font-bold text-xl">{errorCount} / 5</strong>
          </li>
        </ul>
        <h3 className="text-lg font-semibold text-center">
          Let&#39;s play again!
        </h3>
        <DifficultySelector />
      </DialogContent>
    </Dialog>
  );
}
