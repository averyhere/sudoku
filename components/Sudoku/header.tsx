import { NewGameButton } from "@/components/Sudoku/new-game-button";
import { ScoreboardButton } from "@/components/Sudoku/scoreboard";

export function Header() {
  return (
    <div className="flex gap-2 w-full justify-between items-center">
      <h2 className="text-3xl font-bold">Sudoku</h2>
      <div className="flex gap-2">
        <NewGameButton variant="ghost">New Game</NewGameButton>
        <ScoreboardButton variant="ghost">Scoreboard</ScoreboardButton>
      </div>
    </div>
  );
}
