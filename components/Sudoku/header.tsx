import { NewGameButton } from "@/components/Sudoku/new-game-button";
import { ResetGameButton } from "@/components/Sudoku/reset-game-button";
import { ScoreboardButton } from "@/components/Sudoku/scoreboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <div className="flex gap-2 w-full justify-between">
      <Button asChild size="sm">
        <Link href="/">Home</Link>
      </Button>
      <div className="flex gap-2">
        <NewGameButton variant="outline" size="sm">
          New
        </NewGameButton>
        <ResetGameButton variant="outline" size="sm">
          Reset
        </ResetGameButton>
        <ScoreboardButton variant="outline" size="sm">
          Scoreboard
        </ScoreboardButton>
      </div>
    </div>
  );
}
