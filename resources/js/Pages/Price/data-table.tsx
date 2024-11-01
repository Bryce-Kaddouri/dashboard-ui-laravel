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
import { SearchIcon } from "lucide-react"
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
    <div>
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
       
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}

          
        </TableHeader>
        <TableBody>
           {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
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
