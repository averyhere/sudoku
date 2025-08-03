"use client";

import { cn } from "@/lib/utils";
import { useSudokuGameStore } from "@/hooks/useSudokuGameStore";
import { NewGameButton } from "./new-game-button";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";

export function SudokuBoard() {
  const { board, originalBoard, pointer, setPointer } = useSudokuGameStore();

  if (!board || !originalBoard) return <SudokuBoardSkeleton />;

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
    <div className="sudoku-board w-full h-full relative grid grid-cols-9 grid-rows-9 gap-0 aspect-square border border-blue/30 border-l-1">
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
          cellCoords.col < 3 && cellCoords.row < 3 ? "bg-purple/20" : "",
          cellCoords.col > 5 && cellCoords.row < 3 ? "bg-purple/20" : "",
          cellCoords.col > 2 &&
          cellCoords.col < 6 &&
          cellCoords.row > 2 &&
          cellCoords.row < 6
            ? "bg-purple/20"
            : "",
          cellCoords.col < 3 && cellCoords.row > 5 ? "bg-purple/20" : "",
          cellCoords.col > 5 && cellCoords.row > 5 ? "bg-purple/20" : "",
        ];

        return (
          <button
            key={`${index}`}
            onClick={() => setPointer(index)}
            // disabled={[...originalBoard!.puzzle][index] !== "-"}
            className={cn([
              "sudoku-cell cursor-pointer",
              "flex items-center justify-center text-2xl font-light border-blue/30 hover:bg-blue/30",
              altBg,
              thickBorder,
              pointer && pointer.row === cellCoords.row ? "bg-pink/15" : "",
              pointer && pointer.col === cellCoords.col ? "bg-pink/15" : "",
              pointer?.index !== undefined &&
              value === board.puzzle[pointer.index] &&
              value !== "-"
                ? "bg-blue/15"
                : "",
              pointer?.index === index ? "bg-blue/40" : "",
              getCellTextColor(index),
            ])}
          >
            {value !== "-" ? value : ""}
          </button>
        );
      })}
    </div>
  );
}

export function SudokuBoardSkeleton() {
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShowButton(true);
    }, 1000);
  }, []);

  return (
    <div className="w-full grid grid-cols-1 grid-rows-1">
      <div className="grid grid-cols-9 grid-rows-9 gap-1 col-start-1 row-start-1">
        {[...Array(81)].map((_, index) => (
          <Skeleton key={index} className="w-10 h-10 rounded-none" />
        ))}
      </div>

      {showButton && (
        <div className="col-start-1 row-start-1 z-10 flex items-center justify-center">
          <NewGameButton
            size="lg"
            className={cn([
              "opacity-0 scale-0 transition-all duration-500",
              showButton && "opacity-100 scale-100",
            ])}
          >
            Start Game
          </NewGameButton>
        </div>
      )}
    </div>
  );
}
