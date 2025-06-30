import { TicTacToeBoard } from "@/components/TicTacToe";

export default function Page() {
  return (
    <main className="flex flex-col gap-2 h-full">
      <h2 className="text-xl font-bold text-center">Tic-Tac-Toe</h2>

      <TicTacToeBoard />
    </main>
  );
}
