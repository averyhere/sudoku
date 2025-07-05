import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSudoku } from "sudoku-gen";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";
import { Sudoku } from "sudoku-gen/dist/types/sudoku.type";
import type { ScoreType } from "@/components/Sudoku/scoreboard";

type SudokuGameState = {
  difficulty: Difficulty | undefined;
  board: Sudoku | undefined; // Current puzzle state
  originalBoard: Sudoku | undefined; // Original puzzle (read-only reference)
  pointer: null | { index: number; row: number; col: number };
  timer: number; // Elapsed time in seconds
  isPaused: boolean;
  setBoard: (board: Sudoku) => void;
  setOriginalBoard: (board: Sudoku) => void;
  setPointer: (index: number) => void;
  clearPointer: () => void;
  tick: () => void;
  pause: () => void;
  resume: () => void;
  newGame: (d: Difficulty) => void;
  reset: () => void;
  errorCount: number;
  incrementErrorCount: () => void;
  scoreboard: ScoreType[];
  addScore: ({
    date,
    time,
    errorCount,
    difficulty,
    result,
  }: {
    date: Date;
    time: number;
    errorCount: number;
    difficulty: Difficulty;
    result: "won" | "lost";
  }) => void;
  clearScores: () => void;
  gameStatus: null | "won" | "lost";
  setGameStatus: (status: null | "won" | "lost") => void;
};

export const useSudokuGameStore = create<SudokuGameState>()(
  persist(
    (set) => ({
      difficulty: undefined,
      board: undefined,
      originalBoard: undefined,
      pointer: null,
      timer: 0,
      isPaused: true,
      setBoard: (board) => set({ board }),
      setOriginalBoard: (board) => set({ originalBoard: board }),
      setPointer: (index) => {
        set({
          pointer: {
            index: index,
            row: Math.floor(index / 9),
            col: index % 9,
          },
        });
      },
      clearPointer: () => set({ pointer: null }),
      tick: () =>
        set((state) => (state.isPaused ? state : { timer: state.timer + 1 })),
      pause: () => set({ isPaused: true }),
      resume: () => set({ isPaused: false }),
      newGame: (d: Difficulty) => {
        const newBoard = getSudoku(d);
        set({
          difficulty: d,
          board: newBoard,
          originalBoard: newBoard,
          timer: 0,
          isPaused: true,
          errorCount: 0,
        });
      },
      reset: () => {
        set((state) => ({
          difficulty: state.difficulty,
          board: state.originalBoard,
          originalBoard: state.originalBoard,
          timer: 0,
          isPaused: true,
          errorCount: 0,
        }));
      },
      errorCount: 0,
      incrementErrorCount: () =>
        set((state) => ({ errorCount: state.errorCount + 1 })),
      scoreboard: [],
      addScore: ({
        date,
        time,
        errorCount,
        difficulty,
        result,
      }: {
        date: Date;
        time: number;
        errorCount: number;
        difficulty: Difficulty;
        result: "won" | "lost";
      }) =>
        set((state) => ({
          scoreboard: [
            ...state.scoreboard,
            { date, time, errorCount, difficulty, result },
          ],
        })),
      clearScores: () => set({ scoreboard: [] }),
      gameStatus: null,
      setGameStatus: (status: null | "won" | "lost") =>
        set({ gameStatus: status }),
    }),
    {
      name: "sudoku-game", // key in localStorage
    },
  ),
);
