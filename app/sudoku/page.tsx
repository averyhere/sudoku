import { SudokuBoard } from "@/components/Sudoku";
import { SudokuHeader } from "@/components/Sudoku";

export default function Page() {
  return (
    <main className="flex flex-col gap-2 h-full">
      <h2 className="text-xl font-bold text-center">Sudoku</h2>
      <SudokuHeader />
      <SudokuBoard />
    </main>
  );
}
