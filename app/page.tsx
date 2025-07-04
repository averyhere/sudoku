import { SudokuBoard } from "@/components/Sudoku";
import { SudokuHeader } from "@/components/Sudoku";

export default function Home() {
  return (
    <main className="flex flex-col gap-2 h-full">
      <SudokuHeader />
      <SudokuBoard />
    </main>
  );
}
