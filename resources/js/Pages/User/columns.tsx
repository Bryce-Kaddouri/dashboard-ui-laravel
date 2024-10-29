"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Price, Product, User } from "@/types"
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
import { useState } from "react";
import { ArrowUpDown } from "lucide-react"
import { DataTableColumnHeader } from "@/Components/ColumnHeader";
import { ConfirmDeleteUserDialog } from "./Partials/ConfirmDeleteUserDialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="ID" />
        )
      },

    
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
    accessorKey: "role",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Role" />

        )
      },
    cell: ({ row }) => {
      return  <Badge variant={row.original.role === 'ROLE_ADMIN' ? 'admin' : 'outline'}>
        {row.original.role}
      </Badge>
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Email" />

        )
      },
      cell: ({ row }) => {
        const email = row.original.email;
        return email ? email : 'N/A';
      },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Updated At" />
        )
      },
      cell: ({ row }) => {
        const updated_at = row.original.updated_at;
        return updated_at ? new Date(updated_at).toLocaleString() : 'N/A';
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
      const user = row.original
 
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
            window.location.href = route('users.show', { id: user.id });
          }}>
            <Eye className="h-4 w-4 mr-2" />
            Show
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            window.location.href = route('users.edit', { id: user.id });
          }}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <ConfirmDeleteUserDialog 
children={<DropdownMenuItem onClick={handleDeleteClick}>
  <Trash className="h-4 w-4 mr-2" />
  Delete
</DropdownMenuItem>}
open={isDialogOpen}
onCancel={() => setIsDialogOpen(false)}
user={user} 
  />
        </DropdownMenuContent>
      </DropdownMenu>
      )
    },
  },
]
