"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import { ColumnType, PageProps, Price, Product } from "@/types"
import { Badge } from "@/Components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon, Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
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
import { TableCell, TableHead } from "@/Components/ui/table";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { usePage } from "@inertiajs/react";
import { Slider } from "@/Components/ui/slider";
import { PriceInput } from "@/Components/ui/price-input";
import PriceRangePicker from "@/Components/price-range-picker";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Price>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="ID" />
        )
      },

    
  },
  {
    accessorKey: "price",
    id: "price",
    header: ({ column }) => {
        return (
            <DataTableColumnHeader column={column} title="Price" />

        )
      },
  },
  {
    accessorKey: "product",
    id: "product",
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
    id: "provider",
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
    id: "effective_date",
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

function navigate(keys: string[], values: any[]) {
  // update the url with the new keys and values
  const url = new URL(window.location.href);
  keys.forEach((key, index) => {
    url.searchParams.set(key, values[index]);
  });
  window.location.href = url.toString();
 }

export const customColumns: ColumnType<Price>[] = [
  {
    id: "id",
    title: "ID",
    header: () => {

      const props = usePage().props as PageProps;
    const {query} = props as unknown as {query: Record<string, string>};
    const maxPrice = props.maxPrice as number;
    console.log(props);
    console.log(query.orderBy, query.direction);
    const orderBy = query.orderBy;
    const direction = query.direction;
    console.log(orderBy, direction);
      
      return (
        <TableHead>
           <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>ID</span>
              {orderBy === "id" && direction === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : orderBy === "id" && direction === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Sort</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], ["id", "asc"])}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], ["id", "desc"])}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex items-center space-x-2">
              <PriceInput value={0} min={0} max={maxPrice} name="price_from" id="price_from" onChange={() => {}} />
              <PriceInput value={maxPrice} min={0} max={maxPrice} name="price_to" id="price_to" onChange={() => {}} />


            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </TableHead>
    )
    },
    body: (value: Price) => {
      console.log("price");
      console.log(value);
      return <TableCell>{value.id}</TableCell>
    }
  },
  {
    id: "price",
    title: "Price",
    header: () => {

      const props = usePage().props as PageProps;
    const {query} = props as unknown as {query: Record<string, string>};
    console.log(props);
    console.log(query.orderBy, query.direction);
    const orderBy = query.orderBy;
    const direction = query.direction;
    console.log(orderBy, direction);
      
      return (
        <TableHead>
           <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>Price</span>
              {orderBy === "price" && direction === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : orderBy === "price" && direction === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Sort</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], ["price", "asc"])}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], ["price", "desc"])}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col w-full gap-2">
              <Label>Minimum Price</Label>
              <Input type="number" name="price_from" id="price_from" onChange={() => {}} />
              <Label>Maximum Price</Label>
              <Input type="number" name="price_to" id="price_to" onChange={() => {}} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </TableHead>
    )
    },
    body: (value: Price) => {
      return <TableCell>{value.price}</TableCell>
    }
  },
  {
    id: "product",
    title: "Product",
    header: () => {

      const props = usePage().props as PageProps;
    const {query} = props as unknown as {query: Record<string, string>};
    console.log(props);
    console.log(query.orderBy, query.direction);
    const orderBy = query.orderBy;
    const direction = query.direction;
    console.log(orderBy, direction);
      
      return (
        <TableHead>
           <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>Product</span>
              {orderBy === "product" && direction === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : orderBy === "product" && direction === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], ["product", "asc"])}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], ["product", "desc"])}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </TableHead>
    )
    },
    body: (value: Price) => {
      return <TableCell>{value.product.name}</TableCell>
    }
  },
  {
    id: "provider",
    title: "Provider",
    header: () => {
      
      const props = usePage().props as PageProps;
    const {query} = props as unknown as {query: Record<string, string>};
    console.log(props);
    console.log(query.orderBy, query.direction);
    const orderBy = query.orderBy;
    const direction = query.direction;
    console.log(orderBy, direction);
      
      return (
        <TableHead>
           <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>Provider</span>
              {orderBy === "provider" && direction === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : orderBy === "provider" && direction === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], ["provider", "asc"])}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], ["provider", "desc"])}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </TableHead>
    )
    },
    body: (value: Price) => {
      return <TableCell>{value.provider.name}</TableCell>
    }
  },
  {
    id: "effective_date",
    title: "Effective Date",
    header: () => {

      const props = usePage().props as PageProps;
    const {query} = props as unknown as {query: Record<string, string>};
    console.log(props);
    console.log(query.orderBy, query.direction);
    const orderBy = query.orderBy;
    const direction = query.direction;
    console.log(orderBy, direction);
      
      return (
        <TableHead>
           <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>Effective Date</span>
              {orderBy === "effective_date" && direction === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : orderBy === "effective_date" && direction === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], ["effective_date", "asc"])}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], ["effective_date", "desc"])}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </TableHead>
    )
    },
    body: (value: Price) => {
      return <TableCell>{new Date(value.effective_date).toLocaleDateString()}</TableCell>
    }
  },
  {
    id: "updated_at",
    title: "Updated At",
    header: () => {

      const props = usePage().props as PageProps;
    const {query} = props as unknown as {query: Record<string, string>};
    console.log(props);
    console.log(query.orderBy, query.direction);
    const orderBy = query.orderBy;
    const direction = query.direction;
    console.log(orderBy, direction);
      
      return (
        <TableHead>
           <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>Updated At</span>
              {orderBy === "updated_at" && direction === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : orderBy === "updated_at" && direction === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], ["updated_at", "asc"])}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(["orderBy", "direction"], ["updated_at", "desc"])}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </TableHead>
    )
    },
    body: (value: Price) => {
      return <TableCell>{new Date(value.updated_at).toLocaleDateString()}</TableCell>
    }
  },
  {
    id: "actions",
    title: "Actions",
    header: () => {
      return <TableHead>Actions</TableHead>
    },
    body: (value: Price) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const handleDeleteClick = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent the dropdown from closing
        setIsDialogOpen(true); // Open the confirmation dialog
      };
      const price = value;
      return <TableCell className="columns-1">
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
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
    </TableCell>
    }
  }
]
