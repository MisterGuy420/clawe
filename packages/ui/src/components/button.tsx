import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@clawe/ui/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-transform",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 hover:shadow-lg hover:shadow-destructive/20",
        outline:
          "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground dark:border-sidebar-border dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground hover:border-primary/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-sm",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:shadow-sm",
        link: "text-primary underline-offset-4 hover:underline",
        brand:
          "bg-brand text-brand-foreground hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/25 border-0",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        xs: "h-7 gap-1 rounded-md px-2.5 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 rounded-lg gap-1.5 px-3.5 has-[>svg]:px-2.5 text-xs font-medium",
        lg: "h-11 rounded-lg px-6 has-[>svg]:px-4 font-medium",
        xl: "h-12 rounded-lg px-8 has-[>svg]:px-5 font-medium text-base",
        icon: "h-10 w-10",
        "icon-xs": "h-6 w-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
