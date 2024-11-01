import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon,
    EyeNoneIcon,
  } from "@radix-ui/react-icons"
  import { Column } from "@tanstack/react-table"
  
  import { cn } from "@/lib/utils"
  import { Button } from "@/Components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/Components/ui/dropdown-menu"

  import {usePage} from '@inertiajs/react'
import { PageProps } from "@/types"
  
  interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
  }
  
  export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
  }: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
      return <div className={cn(className)}>{title}</div>
    }

    const props = usePage().props as PageProps;
    const {query} = props as unknown as {query: Record<string, string>};
    console.log(props);
    console.log(query.orderBy, query.direction);
    const orderBy = query.orderBy;
    const direction = query.direction;
    console.log(orderBy, direction);

    function navigate(keys: string[], values: any[]) {
      // update the url with the new keys and values
      const url = new URL(window.location.href);
      keys.forEach((key, index) => {
        url.searchParams.set(key, values[index]);
      });
      window.location.href = url.toString();
     }
  
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>{title}</span>
              {orderBy === column.id && direction === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : orderBy === column.id && direction === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], [column.id, "asc"])}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], [column.id, "desc"])}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  
  