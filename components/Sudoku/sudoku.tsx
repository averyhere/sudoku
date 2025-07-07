import { SudokuControls } from "./controls";
import { SudokuHeader } from "./header";
import { SudokuBoard } from "./game-board";
import { SudokuEndDialog } from "./game-over-dialog";

export function Sudoku() {
  return (
    <div className="w-full h-full mx-auto max-w-sm flex flex-col gap-2 items-center justify-end md:justify-center">
      <SudokuHeader />

      <SudokuBoard />

      <SudokuControls />

      <SudokuEndDialog />
    </div>
  );
}
