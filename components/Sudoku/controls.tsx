"use client";

import { useRef, useEffect } from "react";
import { useSudokuGameStore } from "@/hooks/useSudokuGameStore";
import { PiBackspaceDuotone } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const SudokuControls = ({ layout }: { layout?: string }) => {
  const {
    difficulty,
    board,
    originalBoard,
    setBoard,
    pointer,
    clearPointer,
    isPaused,
    resume,
    timer,
    pause,
    errorCount,
    incrementErrorCount,
    setGameStatus,
    addScore,
  } = useSudokuGameStore();

  const handleKeyPressRef = useRef(handleKeyPress);
  handleKeyPressRef.current = handleKeyPress;
  const handleMouseClickRef = useRef(handleMouseClickPress);
  handleMouseClickRef.current = handleMouseClickPress;

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

  if (!board || !originalBoard) return <SudokkuControlsSkeleton />;

  function handleSetValue(value: string) {
    if (isPaused) resume();
    if (pointer === null) return;
    if ([...originalBoard!.puzzle][pointer.index] !== "-") return;
    const newPuzzle = [...board!.puzzle];
    newPuzzle[pointer.index] = value;
    const correctValue = [...board!.solution][pointer.index];
    console.log("setting value", value);
    if (
      difficulty !== "easy" &&
      value !== correctValue &&
      value !== "-" &&
      value !== [...board!.puzzle][pointer.index]
    ) {
      incrementErrorCount();
    }

    setBoard({ ...board!, puzzle: newPuzzle.join("") });

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

    if (errorCount === 4) {
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
  }

  function handleKeyPress(event: KeyboardEvent) {
    const key = event.key;
    console.log("keybord click", key, key === "Backspace");
    if (key === "Delete" || key === "Backspace") {
      event.preventDefault(); // Prevent the default browser behavior for the key.
      handleSetValue("-");
      clearPointer();
    } else if (key in ["1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
      event.preventDefault(); // Prevent the default browser behavior for the key.
      handleSetValue(key);
      clearPointer();
    }
  }

  function handleMouseClickPress(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !target.parentElement?.classList.contains("sudoku-board") &&
      !target.parentElement?.classList.contains("sudoku-controls")
    ) {
      event.preventDefault();
      clearPointer();
    }
  }

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

  return (
    <div className="sudoku-controls flex flex-col gap-8">
      <div
        className={cn([
          "w-full grid gap-2",
          !layout || layout === "default"
            ? "grid-cols-10"
            : "grid-cols-3 grid-rows-4",
        ])}
      >
        <Button
          variant="secondary"
          onClick={() => handleSetValue("-")}
          size="icon"
          className="w-full h-16 md:h-9 text-3xl md:text-lg"
          disabled={
            !board!.puzzle.includes("-") ||
            !!(pointer && originalBoard!.puzzle[pointer.index] !== "-")
          }
        >
          <PiBackspaceDuotone className="size-6 md:size-6" />
          <span className="sr-only">Clear value</span>
        </Button>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            variant="secondary"
            key={num}
            onClick={() => handleSetValue(num.toString())}
            className="w-full h-16 md:h-9 font-bold text-2xl md:text-lg"
            disabled={
              board!.puzzle.match(new RegExp(`${num}`, "g"))?.length === 9
            }
          >
            {num}
          </Button>
        ))}
      </div>

      {process.env.NEXT_PUBLIC_GAME_DEBUG && (
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" size="sm" onClick={printSolution}>
            Print Solution to Console
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setBoard({
                ...board!,
                puzzle: board!.solution,
              });
            }}
          >
            Autofill
          </Button>
        </div>
      )}
    </div>
  );
};

export function SudokkuControlsSkeleton() {
  return (
    <div className="w-full grid grid-cols-10 gap-2 mb-12 md:mb-0">
      {[...Array(10)].map((_, index) => (
        <Skeleton
          key={index}
          className="w-full h-16 md:h-9 text-3xl md:text-lg rounded-none"
        />
      ))}
    </div>
  );
}
