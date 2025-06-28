"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { GameTimer } from "@/components/timer";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";

export function GameBoard() {
  const {
    difficulty,
    board,
    originalBoard,
    setBoard,
    isPaused,
    resume,
    timer,
    pause,
    reset,
    newGame,
    errorCount,
    incrementErrorCount,
    addScore,
  } = useGameStore();
  const [selectedCellCoords, setSelectedCellCoords] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<null | "won" | "lost">(null);
  const handleKeyPressRef = useRef(handleKeyPress);
  handleKeyPressRef.current = handleKeyPress;

  const getCellTextColor = (index: number): string => {
    const value = [...board!.puzzle][index];
    const ogValue = [...originalBoard!.puzzle][index];
    if (value === "" || ogValue !== "-") return "text-foreground";

    const correctValue = [...board!.solution][index];
    return value === correctValue ? "text-green-600" : "text-red-700";
  };

  const handleSelectCell = (index: number) => {
    setSelectedCell(index);
    setSelectedCellCoords({ row: Math.floor(index / 9), col: index % 9 });
  };

  const handleSetValue = (value: string) => {
    if (isPaused) resume();
    if (selectedCell === null) return;
    const newPuzzle = [...board!.puzzle];
    newPuzzle[selectedCell] = value;
    const correctValue = [...board!.solution][selectedCell];

    if (
      difficulty !== "easy" &&
      value !== correctValue &&
      value !== [...board!.puzzle][selectedCell]
    ) {
      incrementErrorCount();
    }

    setBoard({ ...board!, puzzle: newPuzzle.join("") });
    setSelectedCellCoords(null);
    setSelectedCell(null);

    if (newPuzzle.join("") === board!.solution) {
      pause();
      addScore({
        time: timer,
        errorCount: errorCount,
        difficulty: difficulty!,
        date: new Date(),
        result: "won",
      });
      setGameStatus("won");
    }

    if (errorCount >= 5) {
      pause();
      addScore({
        time: timer,
        errorCount: errorCount,
        difficulty: difficulty!,
        date: new Date(),
        result: "lost",
      });
      setGameStatus("lost");
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKeyPressRef.current(e);

    document.addEventListener("keydown", handler);

    // Clean up the event listener when the component unmounts.
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  function handleKeyPress(event: KeyboardEvent) {
    const key = event.key;

    if (key in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "delete"]) {
      event.preventDefault(); // Prevent the default browser behavior for the key.
      if (key === "Backspace") {
        handleSetValue("-");
      } else {
        handleSetValue(key);
      }
    }
  }

  if (!board) {
    return (
      <div className="w-full max-w-sm">
        <h1 className="text-center mb-4">Select a difficulty to begin:</h1>
        <ToggleGroup
          type="single"
          variant="outline"
          className="flex w-full"
          onValueChange={(value: Difficulty) => newGame(value as Difficulty)}
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
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-sm">
        {board && (
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex items-end justify-between">
              <div>
                <p className="capitalize">Difficulty: {difficulty}</p>
                {difficulty !== "easy" && <p>Errors: {errorCount}/5</p>}
              </div>
              <GameTimer />
            </div>

            <div className="relative overflow-hidden grid grid-cols-9 grid-rows-9 gap-0 border border-secondary aspect-square">
              {[...board.puzzle].map((value, index) => {
                const cellCoords = {
                  row: Math.floor(index / 9),
                  col: index % 9,
                };
                const thickBorder = [
                  cellCoords.col % 3 === 0 ? "border-l-2" : "border-l",
                  cellCoords.col % 3 === 2 ? "border-r-2" : "border-r",
                  cellCoords.row % 3 === 0 ? "border-t-2" : "border-t",
                  cellCoords.row % 3 === 2 ? "border-b-2" : "border-b",
                ].join(" ");
                return (
                  <button
                    key={`${index}`}
                    onClick={() => handleSelectCell(index)}
                    disabled={[...originalBoard!.puzzle][index] !== "-"}
                    className={cn([
                      "flex items-center justify-center text-lg font-mono border-secondary hover:bg-[var(--blue)]/30",
                      selectedCellCoords?.row === cellCoords.row
                        ? "bg-primary/10 dark:bg-primary/30"
                        : "",
                      selectedCellCoords?.col === cellCoords.col
                        ? "bg-primary/10 dark:bg-primary/30"
                        : "",
                      selectedCell === index
                        ? "bg-[var(--blue)]/30 dark:bg-[var(--blue)]/50"
                        : "",
                      getCellTextColor(index),
                      thickBorder,
                    ])}
                  >
                    {value !== "-" ? value : ""}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-10 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  onClick={() => handleSetValue(num.toString())}
                  className="w-full h-12 md:h-9 font-bold"
                  disabled={
                    board!.puzzle.match(new RegExp(`${num}`, "g"))?.length === 9
                  }
                >
                  {num}
                </Button>
              ))}
              <Button
                onClick={() => handleSetValue("-")}
                className="w-full h-12 md:h-9 font-bold"
              >
                X
              </Button>
            </div>
            <Button variant="ghost" onClick={reset}>
              Reset
            </Button>
          </div>
        )}
      </div>

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
            <li>Time taken: {timer} seconds</li>
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
