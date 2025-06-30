import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-full max-w-sm mx-auto">
      <h2 className="text-lg font-bold">Available games:</h2>
      <ul>
        <li>
          <Button asChild>
            <Link href="/sudoku">Sudoku</Link>
          </Button>
        </li>
      </ul>
    </main>
  );
}
