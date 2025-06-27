import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/gameStore";

export function GameTimer({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement> & { className?: string }) {
  const timer = useGameStore((s) => s.timer);
  const tick = useGameStore((s) => s.tick);

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <div className={cn([className])} {...props}>
      Time: {formatTime(timer)}
    </div>
  );
}
