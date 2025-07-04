"use client";

import { useState, useRef, useEffect } from "react";
import { cn, formatTime } from "@/lib/utils";
import { useSudokuGameStore } from "@/hooks/useSudokuGameStore";
import { PiBackspaceDuotone } from "react-icons/pi";
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

export function SudokuBoard() {
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
    errorCount,
    incrementErrorCount,
    addScore,
  } = useSudokuGameStore();
  const [selectedCellCoords, setSelectedCellCoords] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<null | "won" | "lost">(null);
  const handleKeyPressRef = useRef(handleKeyPress);
  handleKeyPressRef.current = handleKeyPress;
  const handleMouseClickRef = useRef(handleMouseClickPress);
  handleMouseClickRef.current = handleMouseClickPress;

  const printSolution = () => {
    if (!process.env.NEXT_PUBLIC_GAME_DEBUG) return;
    const solution = `
      |---|---|---|---|---|---|---|---|---|
      | ${[...board!.solution].slice(0, 9).join(" | ")} |
      |---|---|---|---|---|---|---|---|---|
      | ${[...board!.solution].slice(9, 18).join(" | ")} |
      |---|---|---|---|---|---|---|---|---|
      | ${[...board!.solution].slice(18, 27).join(" | ")} |
      |---|---|---|---|---|---|---|---|---|
      | ${[...board!.solution].slice(27, 36).join(" | ")} |
      |---|---|---|---|---|---|---|---|---|
      | ${[...board!.solution].slice(36, 45).join(" | ")} |
      |---|---|---|---|---|---|---|---|---|
      | ${[...board!.solution].slice(45, 54).join(" | ")} |
      |---|---|---|---|---|---|---|---|---|
      | ${[...board!.solution].slice(54, 63).join(" | ")} |
      |---|---|---|---|---|---|---|---|---|
      | ${[...board!.solution].slice(63, 72).join(" | ")} |
      |---|---|---|---|---|---|---|---|---|
      | ${[...board!.solution].slice(72, 81).join(" | ")} |
      |---|---|---|---|---|---|---|---|---|
    `;
    console.log("Solution:");
    console.log(solution);
  };

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

  const handleSelectCell = (index: number) => {
    setSelectedCell(index);
    setSelectedCellCoords({ row: Math.floor(index / 9), col: index % 9 });
  };

  const handleSetValue = (value: string) => {
    if (isPaused) resume();
    if (selectedCell === null) return;
    if ([...originalBoard!.puzzle][selectedCell] !== "-") return;
    const newPuzzle = [...board!.puzzle];
    newPuzzle[selectedCell] = value;
    const correctValue = [...board!.solution][selectedCell];
    console.log("setting value", value);
    if (
      difficulty !== "easy" &&
      value !== correctValue &&
      value !== "-" &&
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
    const keyPressandler = (e: KeyboardEvent) => handleKeyPressRef.current(e);
    const mouseClickHandler = (e: MouseEvent) => handleMouseClickRef.current(e);

    document.addEventListener("keydown", keyPressandler);
    document.addEventListener("click", mouseClickHandler);

    // Clean up the event listener when the component unmounts.
    return () => {
      document.removeEventListener("keydown", keyPressandler);
      document.addEventListener("click", mouseClickHandler);
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

  function handleMouseClickPress(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !target.parentElement?.classList.contains("sudoku-board") &&
      !target.parentElement?.classList.contains("sudoku-controls")
    ) {
      setSelectedCell(null);
      setSelectedCellCoords(null);
    }
  }

  return (
    <>
      <div className="w-full mx-auto flex flex-col gap-2 min-h-full items-center justify-center">
        {board && (
          <>
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
                  cellCoords.col < 3 && cellCoords.row < 3
                    ? "bg-purple/10"
                    : "",
                  cellCoords.col > 5 && cellCoords.row < 3
                    ? "bg-purple/10"
                    : "",
                  cellCoords.col > 2 &&
                  cellCoords.col < 6 &&
                  cellCoords.row > 2 &&
                  cellCoords.row < 6
                    ? "bg-purple/10"
                    : "",
                  cellCoords.col < 3 && cellCoords.row > 5
                    ? "bg-purple/10"
                    : "",
                  cellCoords.col > 5 && cellCoords.row > 5
                    ? "bg-purple/10"
                    : "",
                ];

                return (
                  <button
                    key={`${index}`}
                    onClick={() => handleSelectCell(index)}
                    // disabled={[...originalBoard!.puzzle][index] !== "-"}
                    className={cn([
                      "sudoku-cell",
                      "flex items-center justify-center text-lg font-mono border-secondary hover:bg-[var(--blue)]/30",
                      altBg,
                      selectedCellCoords?.row === cellCoords.row
                        ? "bg-purple/30"
                        : "",
                      selectedCellCoords?.col === cellCoords.col
                        ? "bg-purple/30"
                        : "",
                      value === board.puzzle[selectedCell!] && value !== "-"
                        ? "bg-blue/30"
                        : "",
                      selectedCell === index ? "bg-blue/30 font-bold" : "",
                      getCellTextColor(index),
                      thickBorder,
                    ])}
                  >
                    {value !== "-" ? value : ""}
                  </button>
                );
              })}
            </div>

            <div className="sudoku-controls w-full grid grid-cols-5 md:grid-cols-10 grid-rows-2 md:grid-rows-1 gap-2 mb-12 md:mb-0">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  onClick={() => handleSetValue(num.toString())}
                  className="w-full h-16 md:h-9 font-bold text-3xl md:text-lg"
                  disabled={
                    board!.puzzle.match(new RegExp(`${num}`, "g"))?.length === 9
                  }
                >
                  {num}
                </Button>
              ))}
              <Button
                onClick={() => handleSetValue("-")}
                className="w-full h-16 md:h-9 font-bold text-3xl md:text-lg"
                variant="link"
              >
                <PiBackspaceDuotone className="size-15 md:size-8 text-pink" />
                <span className="sr-only">Clear value</span>
              </Button>
            </div>

            {process.env.NEXT_PUBLIC_GAME_DEBUG && (
              <div className="flex gap-4">
                <Button variant="outline" size="sm" onClick={printSolution}>
                  Print Solution to Console
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setBoard({
                      ...board,
                      puzzle: board.solution,
                    });
                  }}
                >
                  Autofill
                </Button>
              </div>
            )}
          </>
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
