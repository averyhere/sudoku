import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <div className="flex items-center justify-center gap-1 h-full text-xs pb-1 pt-2">
      <span>&copy; {new Date().getFullYear()} </span>
      <Button variant="link" className="p-0" asChild>
        <Link href="https://averyhere.com" target="_blank">
          Avery Ondo
        </Link>
      </Button>
    </div>
  );
}
