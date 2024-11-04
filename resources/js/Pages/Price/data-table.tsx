"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/Components/ui/dropdown-menu"
import * as React from "react"
import { Input } from "@/Components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import { Button } from "@/Components/ui/button"
import { DataTablePagination } from "@/Components/Pagination"
import { DataTableViewOptions } from "@/Components/ColumnToggle"
import { Pagination, Price } from "@/types"
import { usePage } from "@inertiajs/react"
import { ListFilter, PlusCircle, SearchIcon, File } from "lucide-react"
import { customColumns } from "./columns"
interface DataTableProps {
  columns: ColumnDef<Price, any>[]
  data: Pagination<Price>
}

export function DataTable({
  columns,
  data,
}: DataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
      )
    const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

    const query = usePage().props.query as Record<string, string>;
    const [search, setSearch] = React.useState(query.search || '');

  

  function navigate(key: string, value: any) {
    // update the url with the new key and value
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.location.href = url.toString();
   }

   const table = useReactTable({
    pageCount: 1,
    
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input value={search} type="text" placeholder="Search..." onChange={(event) => {
            setSearch(event.target.value);
          }}/>
          <Button type="button" size="icon" onClick={() => {
            navigate("search", search);
            }}>
              <SearchIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2">
                
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button size="sm" className="h-8 gap-1" onClick={() => {
                  window.location.href = route('prices.create');
                }}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Price
                  </span>
                </Button>
                
              </div>
    </div>
       
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          
          
          {customColumns.map((column) => (
            column.header()
          ))}

          
        </TableHeader>
        <TableBody>
           {data.data?.length ? (
            data.data.map((row) => (
              <TableRow  
              >
                  {customColumns.map((column) => (
                    column.body(row)
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )} 
        </TableBody>
      </Table>
    </div>
    <DataTablePagination pagination={data} />
    </div>
  )
}
