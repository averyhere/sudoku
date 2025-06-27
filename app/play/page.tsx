import { GameBoard } from "@/components/game-board";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh">
      <h1 className="text-3xl font-bold">Sudoku</h1>
      <GameBoard />
    </div>
  );
}
