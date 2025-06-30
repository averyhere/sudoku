import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSudokuGameStore } from "@/hooks/useSudokuGameStore";

export function GameTimer({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement> & { className?: string }) {
  const timer = useSudokuGameStore((s) => s.timer);
  const tick = useSudokuGameStore((s) => s.tick);
  const isPaused = useSudokuGameStore((s) => s.isPaused);

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <div
      className={cn([!isPaused ? "animate-pulse" : "", className])}
      {...props}
    >
      Time: {formatTime(timer)}
    </div>
  );
}
