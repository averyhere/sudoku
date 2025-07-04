import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { AveryOndoLogo } from "@/components/logos";

const ExternalLinks = [
  {
    label: (
      <>
        <Github className="size-4" />
        <span>GitHub</span>
      </>
    ),
    href: "https://github.com/averyondo/time-passer",
  },
];

export function Header() {
  return (
    <header className="w-full mx-auto py-4 flex gap-2 justify-between items-center">
      <div className="flex gap-4">
        <div>
          <h1 className="text-xl font-bold">
            <Link href="/" className="hover:underline">
              Time Passer
            </Link>
          </h1>
          <div className="flex gap-1 items-start">
            <small className="text-xs text-foreground/40 leading-1">by</small>
            <Link href="https://averyondo.com" target="_blank">
              <AveryOndoLogo variant="horizontal" className="h-4 w-auto mr-2" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <ul className="hidden md:flex gap-8">
          {ExternalLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="flex items-center gap-1">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </header>
  );
}
