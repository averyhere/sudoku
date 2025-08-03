"use client";

import { useSudokuGameStore } from "@/hooks/useSudokuGameStore";
import { Main } from "@/components/Main";
import { Header as PageHeader } from "@/components/Header";
import { DataTable } from "@/components/Sudoku/scoreboard/table";
import { columns } from "@/components/Sudoku/scoreboard/columns";
import { Button } from "@/components/ui/button";

export default function Home() {
  const scoreboard = useSudokuGameStore((s) => s.scoreboard);
  const clearScores = useSudokuGameStore((s) => s.clearScores);

  return (
    <>
      <div className="w-full min-h-screen p-2 flex flex-col gap-4 items-center justify-start">
        <PageHeader />
        <Main className="w-full grow max-w-4xl">
          <header className="flex flex-row justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl">Scoreboard</h1>
              <p className="text-lg font-light">View and clear your scores.</p>
            </div>
            <div>
              <Button variant="destructive" size="sm" onClick={clearScores}>
                Clear Scores
              </Button>
            </div>
          </header>
          <DataTable columns={columns} data={scoreboard} />
        </Main>
      </div>
    </>
  );
}
