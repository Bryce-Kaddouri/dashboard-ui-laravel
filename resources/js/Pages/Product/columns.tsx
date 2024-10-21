"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@/types"
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
import { ConfirmDeleteProductDialog } from "./Partials/ConfirmDeleteProductDialog";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react"
import { DataTableColumnHeader } from "@/Components/ColumnHeader";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="ID" />
        )
      },

    
  },
  {
    accessorKey: "image",
    header: "Image",
      cell: ({ row }) => {
        return (<img src={row.original.image} alt={row.original.name} className="w-16 h-16 rounded-sm" />)
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Name" />

        )
      },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Status" />

        )
      },
    cell: ({ row }) => {
      return  <Badge variant="active">Active</Badge>
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Description" />

        )
      },
  },
  {
    accessorKey: "providers",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Providers" />
        )
      },
    cell: ({ row }) => {
      return <Badge className="py-2" variant="outline">{row.original.providers.length}</Badge>;
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
      const product = row.original
 
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
            window.location.href = route('products.show', { id: product.id });
          }}>
            <Eye className="h-4 w-4 mr-2" />
            Show
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            window.location.href = route('products.edit', { id: product.id });
          }}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <ConfirmDeleteProductDialog 
children={<DropdownMenuItem onClick={handleDeleteClick}>
  <Trash className="h-4 w-4 mr-2" />
  Delete
</DropdownMenuItem>}
open={isDialogOpen}
onCancel={() => setIsDialogOpen(false)}
product={product} 
  />
        </DropdownMenuContent>
      </DropdownMenu>
      )
    },
  },
]
