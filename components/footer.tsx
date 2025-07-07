import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";
import { AddToHomeScreen } from "@/components/AddToHomeScreen";
import { AveryOndoLogo } from "@/components/logos";

export function Footer() {
  return (
    <footer className="w-full flex flex-col gap-1 items-center justify-center text-xs mt-1">
      <AddToHomeScreen />
      <Link
        href="https://averyondo.com"
        target="_blank"
        className="w-full flex flex-col items-center justify-center mt-8"
      >
        <span>
          Created by <span className="sr-only">Avery Ondo</span>
        </span>
        <AveryOndoLogo variant="horizontal" className="h-5 w-auto" />
      </Link>
      <Button variant="link" size="xs" className="p-0" asChild>
        <Link
          className="inline-flex items-center justify-center gap-1"
          href="https://github.com/averyhere/sudoku"
          target="_blank"
        >
          <Github className="size-4" />
          <span>View Source</span>
        </Link>
      </Button>
      <div className="my-2">&copy; {new Date().getFullYear()} Avery Ondo</div>
    </footer>
  );
}
