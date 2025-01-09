import * as React from "react"
    import { cn } from "../../lib/utils"

    const Table = React.forwardRef(({ className, ...props }, ref) => (
      <div className={cn("relative w-full overflow-auto", className)} ref={ref} {...props} />
    ))
    Table.displayName = "Table"

    const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
      <thead className={cn("[&_tr]:border-b", className)} ref={ref} {...props} />
    ))
    TableHeader.displayName = "TableHeader"

    const TableBody = React.forwardRef(({ className, ...props }, ref) => (
      <tbody className={cn("[&_tr:last-child]:border-0", className)} ref={ref} {...props} />
    ))
    TableBody.displayName = "TableBody"

    const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
      <tfoot
        className={cn("bg-background font-medium [&_td]:border-b", className)}
        ref={ref}
        {...props}
      />
    ))
    TableFooter.displayName = "TableFooter"

    const TableRow = React.forwardRef(({ className, ...props }, ref) => (
      <tr
        className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}
        ref={ref}
        {...props}
      />
    ))
    TableRow.displayName = "TableRow"

    const TableHead = React.forwardRef(({ className, ...props }, ref) => (
      <th
        className={cn(
          "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
          className
        )}
        ref={ref}
        {...props}
      />
    ))
    TableHead.displayName = "TableHead"

    const TableCell = React.forwardRef(({ className, ...props }, ref) => (
      <td
        className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0", className)}
        ref={ref}
        {...props}
      />
    ))
    TableCell.displayName = "TableCell"

    const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
      <caption
        className={cn("mt-4 text-sm text-muted-foreground", className)}
        ref={ref}
        {...props}
      />
    ))
    TableCaption.displayName = "TableCaption"

    export {
      Table,
      TableHeader,
      TableBody,
      TableFooter,
      TableRow,
      TableHead,
      TableCell,
      TableCaption,
    }
