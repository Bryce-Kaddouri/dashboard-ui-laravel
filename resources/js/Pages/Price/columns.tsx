"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Price, Product } from "@/types"
import { Badge } from "@/Components/ui/badge";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/Components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { ConfirmDeletePriceDialog } from "./Partials/ConfirmDeletePriceDialog";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react"
import { DataTableColumnHeader } from "@/Components/ColumnHeader";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Price>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="ID" />
        )
      },

    
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Price" />

        )
      },
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Product" />

        )
      },
      cell: ({ row }) => {
        const product = row.original.product;
        return product ? product.name : 'N/A';
      },
  },
  {
    accessorKey: "provider",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Providers" />
        )
      },
      cell: ({ row }) => {
        const provider = row.original.provider;
        return provider ? provider.name : 'N/A';
      },
  },
  {
    accessorKey: "effective_date",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Effective Date" />
        )
      },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Updated At" />
        )
      },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
        const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the dropdown from closing
    setIsDialogOpen(true); // Open the confirmation dialog
  };
      const price = row.original
 
      return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-haspopup="true"
            size="icon"
            variant="ghost"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle  menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => {
            window.location.href = route('prices.show', { id: price.id });
          }}>
            <Eye className="h-4 w-4 mr-2" />
            Show
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            window.location.href = route('prices.edit', { id: price.id });
          }}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <ConfirmDeletePriceDialog 
children={<DropdownMenuItem onClick={handleDeleteClick}>
  <Trash className="h-4 w-4 mr-2" />
  Delete
</DropdownMenuItem>}
open={isDialogOpen}
onCancel={() => setIsDialogOpen(false)}
price={price} 
  />
        </DropdownMenuContent>
      </DropdownMenu>
      )
    },
  },
]
