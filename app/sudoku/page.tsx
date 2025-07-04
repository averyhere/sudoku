import { SudokuBoard } from "@/components/Sudoku";
import { SudokuHeader } from "@/components/Sudoku";

export default function Page() {
  return (
    <main className="flex flex-col gap-2 w-full h-full max-w-sm">
      <SudokuHeader />
      <SudokuBoard />
    </main>
  );
}
