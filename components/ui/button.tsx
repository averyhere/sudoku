import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex relative items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: [
          "text-white",
          "before:content[''] before:bg-pink before:transition-all before:w-full before:h-full before:absolute before:top-0 before:left-0 before:-z-10",
          "after:content[''] after:bg-blue after:transition-all after:w-full after:h-full after:absolute after:top-[.25rem] after:left-[.25rem] after:-z-20",
          "hover:after:top-1.5 hover:after:left-1.5",
          "active:translate-x-[.25rem] active:translate-y-[.25rem] active:after:top-0 active:after:left-0",
          "dark:before:bg-bright-purple dark:after:bg-purple",
        ],
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: [
          "text-white",
          "before:content[''] before:bg-bright-purple before:transition-all before:w-full before:h-full before:absolute before:top-0 before:left-0 before:-z-10",
          "after:content[''] after:bg-purple after:transition-all after:w-full after:h-full after:absolute after:top-[.25rem] after:left-[.25rem] after:-z-20",
          "hover:after:top-1.5 hover:after:left-1.5",
          "active:translate-x-[.25rem] active:translate-y-[.25rem] active:after:top-0 active:after:left-0",
        ],
        ghost: [
          "text-foreground hover:text-white",
          // "before:content[''] before:bg-transparent hover:before:bg-purple before:transition-all before:w-full before:h-full before:absolute before:top-0 before:left-0 before:-z-10",
          // "after:content[''] after:bg-transparent hover:after:bg-pink/30 after:transition-all after:w-full after:h-full after:absolute after:top-[.25rem] after:left-[.25rem] after:-z-20",
          // "hover:after:top-1.5 hover:after:left-1.5",
          // "active:translate-x-[.25rem] active:translate-y-[.25rem] active:after:top-0 active:after:left-0",
        ],
        // ghost:
        //   "hover:bg-purple/20 hover:text-accent-foreground dark:hover:bg-purple/20",
        link: "text-bright-purple dark:text-blue underline-offset-4 decoration-blue hover:underline",
      },
      size: {
        default: "px-4 py-2 has-[>svg]:px-3",
        xs: "text-xs gap-1 px-2 py-1 has-[>svg]:px-0.5",
        sm: "text-sm px-3 py-1.5 has-[>svg]:px-2.5",
        lg: "text-xl px-4 py-2 has-[>svg]:px-4",
        num: "size-full",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        "disabled:opacity-50",
        buttonVariants({ variant, size, className }),
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
