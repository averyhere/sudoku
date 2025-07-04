import { SudokuBoard } from "@/components/Sudoku";
import { SudokuHeader } from "@/components/Sudoku";

export default function Home() {
  return (
    <main className="flex flex-col gap-2 w-full max-w-sm h-full">
      <SudokuHeader />
      <SudokuBoard />
    </main>
  );
}
