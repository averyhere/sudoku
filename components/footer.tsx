import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";
import { AddToHomeScreen } from "@/components/AddToHomeScreen";

export function Footer() {
  return (
    <footer className="w-full flex flex-col gap-4 items-center justify-center text-xs">
      <Button variant="link" size="xs" className="p-0" asChild>
        <Link
          className="inline-flex items-center justify-center gap-1"
          href="https://github.com/averyhere/sudoku"
          target="_blank"
        >
          <Github className="size-4" />
          <span>GitHub Repository</span>
        </Link>
      </Button>
      <AddToHomeScreen />
      <p>
        <span>&copy; {new Date().getFullYear()} </span>
        <Link href="https://averyhere.com" target="_blank">
          Avery Ondo
        </Link>
      </p>
    </footer>
  );
}
