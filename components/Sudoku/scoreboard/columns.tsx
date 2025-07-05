"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";
import { formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Score = {
  date: Date;
  time: number;
  difficulty: Difficulty;
  errorCount: number;
  result: "won" | "lost";
};

export const columns: ColumnDef<Score>[] = [
  {
    accessorKey: "result",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Result
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const result = row.getValue("result") as string;
      return <div className="capitalize">{result}</div>;
    },
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Difficulty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as string;
      return <div className="capitalize">{difficulty}</div>;
    },
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const time = parseFloat(row.getValue("time"));
      const formatted = formatTime(time);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "errorCount",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Errors
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as string;
      const errorCount = row.getValue("errorCount") as number;
      if (difficulty === "easy") return <div>N/A</div>;
      return <div>{errorCount} / 5</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString();
      return <div>{formatted}</div>;
    },
  },
];
