import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  Eye,
  Edit,
  Trash,
  ChevronsUpDown,
  Check,
} from "lucide-react"

import { Badge } from "@/Components/ui/badge"

import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Input } from "@/Components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/Components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip"
import { Pagination, Price, Product } from "@/types"
import { useState, FormEventHandler } from "react"
import { usePage, useForm } from '@inertiajs/react';
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command"
import { cn } from "@/lib/utils"
import { AreaChartLinear } from "./AreaChartLinear"
import { BarChartMultiple } from "./BarChartMultiple"
import { BarChartStackedLegend } from "./BarChartStackedLegend"
import { Provider } from "@/types"
import { DatePickerWithRange } from "@/Components/ui/date-picker-range"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

export function ProductChartList() {
    const products = usePage().props.products as Product[];
    const selectedProduct = usePage().props.product as Product | null;
    const chartData = usePage().props.chart_data as any[];
    const providers = usePage().props.providers as Provider[];
    const selectedDate = usePage().props.date as DateRange | undefined;
    console.log(products);
    console.log(selectedProduct);
    console.log('chart data');
    console.log(chartData);

    const [productOpen, setProductOpen] = useState(false);
    const { get } = useForm();
    const [date, setDate] = useState<DateRange | undefined>(selectedDate);

      const onDateChange = (date: DateRange | undefined) => {
        setDate(date);
        get(route('chart.product', { productId: selectedProduct?.id, date: date }));
      }

  
  
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
          <div className="w-full">
                <Popover open={productOpen} onOpenChange={setProductOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={productOpen}
                            className="justify-between w-full"
                            
                        >
                            {selectedProduct ? selectedProduct.name : "Select product..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-full">
                        <Command>
                            <CommandInput 
                                placeholder="Search product..." 
                            />
                            <CommandList>
                                <CommandEmpty>No product found.</CommandEmpty>
                                <CommandGroup>
                                    {products.map((product) => (
                                        <CommandItem
                                            key={product.id}
                                            value={product.name}
                                            onSelect={(currentValue) => {
                                                console.log(currentValue)
                                                setProductOpen(false) // Close product popover
                                                console.log(product.id);
                                                get(route('chart.product', { productId: product.id }))
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedProduct?.id === product.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {product.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div> 

            {selectedProduct && (
                
                <>
                    <DatePickerWithRange date={date} onDateChange={onDateChange} className="w-full" />
                    <AreaChartLinear data={chartData} providers={providers} />
                    <BarChartMultiple data={chartData} providers={providers} />
                    <BarChartStackedLegend data={chartData} providers={providers} />
                </>
            )}

          
        </main>
  );
}