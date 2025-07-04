import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PiGridFourDuotone } from "react-icons/pi";

export default function Home() {
  return (
    <main className="flex flex-col gap-2 w-full max-w-sm h-full items-center justify-center">
      <h2 className="text-3xl font-bold">Available games:</h2>
      <div className="flex flex-wrap w-full justify-center">
        <Button className="flex flex-col gap-0 w-1/2 md:w-1/3" asChild>
          <Link href="/sudoku">
            <PiGridFourDuotone className="size-full" />
            <span className="text-lg md:text-md font-bold">Sudoku</span>
          </Link>
        </Button>
      </div>
    </main>
  );
}
