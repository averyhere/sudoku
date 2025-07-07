import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Main({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <main id="main-content" className={cn(className)} {...props}>
      {children}
    </main>
  );
}

export function SkipToMainContentLink({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:absolute left-1/2 -translate-x-1/2 focus:px-2 focus:pb-1",
        className,
      )}
      {...props}
    >
      {children || "Skip to main content"}
    </a>
  );
}
