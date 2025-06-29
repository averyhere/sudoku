"use client";

import { useGameStore } from "@/hooks/useGameStore";
import { Button, ButtonProps } from "@/components/ui/button";
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

export function ScoreboardButton({ children, ...props }: ButtonProps) {
  const scoreboard = useGameStore((s) => s.scoreboard);
  const clearScores = useGameStore((s) => s.clearScores);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" {...props}>
          {children}
        </Button>
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
