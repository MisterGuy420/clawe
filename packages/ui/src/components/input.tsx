import * as React from "react";

import { cn } from "@clawe/ui/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground/70 selection:bg-primary/20 selection:text-primary flex h-10 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-base font-medium shadow-sm transition-all duration-200 outline-none",
        "focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:shadow-md",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
