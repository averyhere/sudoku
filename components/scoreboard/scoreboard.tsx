"use client";

import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { columns } from "./columns";
import { DataTable } from "./table";

export function Scoreboard() {
  const scoreboard = useGameStore((s) => s.scoreboard);
  const clearScores = useGameStore((s) => s.clearScores);

  if (scoreboard.length === 0) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Scoreboard</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-full md:w-max">
        <DialogHeader>
          <DialogTitle>Scoreboard</DialogTitle>
          <DialogDescription>View and clear your scores.</DialogDescription>
        </DialogHeader>
        <div className="w-full max-w-full overflow-x-scroll">
          <DataTable columns={columns} data={scoreboard} />
        </div>
        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={clearScores}>
            Clear Scores
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
