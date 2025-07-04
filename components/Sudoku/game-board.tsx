"use client";

import { useState } from "react";
import { cn, formatTime } from "@/lib/utils";
import { useSudokuGameStore } from "@/hooks/useSudokuGameStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { GameTimer } from "@/components/Sudoku/timer";
import { SudokuControls } from "@/components/Sudoku/controls";

export function SudokuBoard() {
  const {
    difficulty,
    board,
    originalBoard,
    pointer,
    setPointer,
    timer,
    reset,
    errorCount,
  } = useSudokuGameStore();
  const [gameStatus, setGameStatus] = useState<null | "won" | "lost">(null);

  const getCellTextColor = (index: number): string => {
    const value = [...board!.puzzle][index];
    const ogValue = [...originalBoard!.puzzle][index];
    if (value === "" || ogValue !== "-")
      return "text-foreground/80 focus:outline-bright-purple";

    const correctValue = [...board!.solution][index];
    return value === correctValue
      ? "text-foreground focus:outline-green-700"
      : "text-red-600 focus:outline-red-600";
  };

  return (
    <>
      {board && (
        <div className="w-full mx-auto flex flex-col gap-2 min-h-full items-center justify-center">
          <div className="sudoku-header w-full flex items-end justify-between">
            <div>
              <p className="capitalize">Difficulty: {difficulty}</p>
              {difficulty !== "easy" && <p>Errors: {errorCount}/5</p>}
            </div>
            <GameTimer />
          </div>

          <div className="sudoku-board w-full relative overflow-hidden grid grid-cols-9 border-l-1 grid-rows-9 gap-0 border border-secondary aspect-square">
            {[...board.puzzle].map((value, index) => {
              const cellCoords = {
                row: Math.floor(index / 9),
                col: index % 9,
              };
              const thickBorder = [
                cellCoords.col % 3 === 0 ? "border-l-1" : "border-l-[0.5px]",
                cellCoords.col % 3 === 2 ? "border-r-1" : "border-r-[0.5px]",
                cellCoords.row % 3 === 0 ? "border-t-1" : "border-t-[0.5px]",
                cellCoords.row % 3 === 2 ? "border-b-1" : "border-b-[0.5px]",
              ].join(" ");
              const altBg = [
                cellCoords.col < 3 && cellCoords.row < 3 ? "bg-purple/10" : "",
                cellCoords.col > 5 && cellCoords.row < 3 ? "bg-purple/10" : "",
                cellCoords.col > 2 &&
                cellCoords.col < 6 &&
                cellCoords.row > 2 &&
                cellCoords.row < 6
                  ? "bg-purple/10"
                  : "",
                cellCoords.col < 3 && cellCoords.row > 5 ? "bg-purple/10" : "",
                cellCoords.col > 5 && cellCoords.row > 5 ? "bg-purple/10" : "",
              ];

              return (
                <button
                  key={`${index}`}
                  onClick={() => setPointer(index)}
                  // disabled={[...originalBoard!.puzzle][index] !== "-"}
                  className={cn([
                    "sudoku-cell",
                    "flex items-center justify-center text-lg font-mono border-secondary hover:bg-[var(--blue)]/30",
                    altBg,
                    pointer?.row === cellCoords.row ? "bg-purple/30" : "",
                    pointer?.col === cellCoords.col ? "bg-purple/30" : "",
                    pointer?.index &&
                    value === board.puzzle[pointer.index] &&
                    value !== "-"
                      ? "bg-blue/30"
                      : "",
                    pointer?.index === index ? "bg-blue/30 font-bold" : "",
                    getCellTextColor(index),
                    thickBorder,
                  ])}
                >
                  {value !== "-" ? value : ""}
                </button>
              );
            })}
          </div>

          <SudokuControls />
        </div>
      )}

      <Dialog
        defaultOpen={!!gameStatus}
        open={!!gameStatus}
        onOpenChange={() => {
          setGameStatus(null);
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
          <ul className="text-center text-sm text-foreground/80">
            <li>
              Difficulty: <span className="capitalize">{difficulty}</span>
            </li>
            <li>Time taken: {formatTime(timer)} seconds</li>
            {difficulty === "easy" && <li>Mistakes made: {errorCount} / 5</li>}
          </ul>
          <DialogFooter>
            <Button onClick={reset} className="w-max m-auto">
              {gameStatus === "won" ? "Play again" : "Try again"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
