"use client";

import { GameTimer } from "@/components/Sudoku/timer";
import { Skeleton } from "@/components/ui/skeleton";
import { useSudokuGameStore } from "@/hooks/useSudokuGameStore";

export function SudokuHeader() {
  const { difficulty, errorCount } = useSudokuGameStore();

  if (!difficulty) return <SudokuHeaderSkeleton />;

  return (
    <div className="sudoku-header w-full flex items-end justify-between">
      <div>
        <p className="capitalize">Difficulty: {difficulty}</p>
        {difficulty !== "easy" && <p>Mistakes: {errorCount}/5</p>}
      </div>
      <GameTimer />
    </div>
  );
}

export function SudokuHeaderSkeleton() {
  return (
    <div className="sudoku-header w-full flex items-end justify-between">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-2">
          <Skeleton className="w-1/3 h-5" />
          <Skeleton className="w-1/4 h-5" />
        </div>
        <div className="w-full flex gap-2">
          <Skeleton className="w-1/3 h-5" />
          <Skeleton className="w-1/8 h-5" />
        </div>
      </div>
      <div>
        <Skeleton className="w-16 h-5" />
      </div>
    </div>
  );
}
