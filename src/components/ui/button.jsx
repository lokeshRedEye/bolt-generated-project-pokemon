import * as React from "react"
    import { cn } from "../../lib/utils"

    const Button = React.forwardRef(
      ({ className, variant, size, ...props }, ref) => {
        return (
          <button
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
              variant === "default" &&
              "bg-primary text-primary-foreground hover:bg-primary/90",
              variant === "destructive" &&
              "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              variant === "outline" &&
              "bg-transparent border border-input hover:bg-accent hover:text-accent-foreground",
              variant === "secondary" &&
              "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              variant === "ghost" &&
              "bg-transparent hover:bg-accent hover:text-accent-foreground",
              size === "default" && "px-4 py-2",
              size === "sm" && "px-3 py-1 rounded-md",
              size === "lg" && "px-8 py-3 rounded-md",
              className
            )}
            ref={ref}
            {...props}
          />
        )
      }
    )
    Button.displayName = "Button"

    export { Button }