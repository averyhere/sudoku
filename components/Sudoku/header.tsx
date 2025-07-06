import { NewGameButton } from "@/components/Sudoku/new-game-button";
import { ScoreboardButton } from "@/components/Sudoku/scoreboard";

export function Header() {
  return (
    <div className="flex gap-2 w-full justify-between items-center">
      <NewGameButton variant="default">New Game</NewGameButton>
      <ScoreboardButton variant="default">Scoreboard</ScoreboardButton>
    </div>
  );
}
