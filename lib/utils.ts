import { clsx, type ClassValue } from "clsx";
import { Sudoku } from "sudoku-gen/dist/types/sudoku.type";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsePuzzleString(puzzle: string): string[][] {
  return Array.from({ length: 9 }, (_, row) =>
    puzzle.slice(row * 9, row * 9 + 9).split(""),
  );
}

export function stringifyPuzzle(puzzle: Sudoku & Array<[]>): string {
  return puzzle.flat().join("");
}
