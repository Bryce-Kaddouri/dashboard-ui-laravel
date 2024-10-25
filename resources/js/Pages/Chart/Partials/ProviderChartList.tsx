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
import { AreaChartLinearMonthly } from "./AreaChartLinearMonthly"
import { AreaChartLinearWeekly } from "./AreaChartLinearWeekly"
import { BarChartMultipleMonthly } from "./BarChartMultipleMothly"
import { BarChartMultipleWeekly } from "./BarChartMultipleWeekly"
import { BarChartStackedLegendWeekly } from "./BarChartStackedLegendWeekly"
import { BarChartStackedLegendMonthly } from "./BarChartStackedLegenMonthly"

export function ProviderChartList() {
    const providers = usePage().props.providers as Provider[];
    const selectedProviderIds = usePage().props.selected_providers as number[];
    const selectedProvider = usePage().props.provider as Provider | null;
    const chartDataMonthly = usePage().props.chart_data_monthly as any[];
    const chartDataWeekly = usePage().props.chart_data_weekly as any[];
    const selectedDate = usePage().props.date as DateRange | undefined;
    console.log(chartDataMonthly);  
    console.log(chartDataWeekly);
    console.log(selectedProvider);
    console.log(providers);
    console.log(selectedDate);
    console.log('selectedProviderIds')
    console.log(selectedProviderIds);
   

    const [productOpen, setProductOpen] = useState(false);
    const { get } = useForm();
    const [date, setDate] = useState<DateRange | undefined>(selectedDate);

      const onDateChange = (date: DateRange | undefined) => {
        setDate(date);
         get(route('chart.provider', { providerIds: selectedProviderIds, date: date })); 
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
                            {selectedProviderIds.length > 0 ? "Add more providers" : "Select provider..."}
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
                                    {providers.map((provider) => (
                                        <CommandItem
                                            key={provider.id}
                                            value={provider.name}
                                            onSelect={(currentValue) => {
                                                console.log(currentValue)
                                                
                                                console.log(provider.id);
                                                // toggle providerId in selectedProviderIds
                                                const newSelectedProviderIds = selectedProviderIds.includes(provider.id) 
                                                    ? selectedProviderIds.filter(id => id !== provider.id) 
                                                    : [...selectedProviderIds, provider.id];
                                                get(route('chart.provider', { providerIds: newSelectedProviderIds })) 
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedProviderIds.includes(provider.id) ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {provider.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <div className="flex flex-wrap w-full gap-2 mt-2">
                    {selectedProviderIds.map(providerId => {
                        const providerName = providers.find(provider => provider.id === providerId)?.name;
                        return (
                            <Badge key={providerId} variant="default" className="flex items-center">
                                {providerName}
                                <Button 
                                    variant="ghost"
                                    size="smallIcon"
                                    className="ml-2" 
                                    onClick={() => {
                                        console.log(providerId);
                                        const newSelectedProviderIds = selectedProviderIds.filter(id => id !== providerId);
                                        get(route('chart.provider', { providerIds: newSelectedProviderIds })) 
                                    }}
                                    aria-label={`Remove ${providerName}`}
                                >
                                    &times;
                                </Button>
                            </Badge>
                        );
                    })}
                </div>
            </div> 

            
                    <DatePickerWithRange date={date} onDateChange={onDateChange} className="w-full" />
                    <AreaChartLinearMonthly data={chartDataMonthly} providers={providers} />
                    <AreaChartLinearWeekly data={chartDataWeekly} providers={providers} />
                    <BarChartMultipleMonthly data={chartDataMonthly} providers={providers} />
                    <BarChartMultipleWeekly data={chartDataWeekly} providers={providers} />
                    <BarChartStackedLegendMonthly data={chartDataMonthly} providers={providers} />
                    <BarChartStackedLegendWeekly data={chartDataWeekly} providers={providers} />
                    {/* <BarChartMultiple data={chartDataMonthly} providers={providers} />
                    <BarChartStackedLegend data={chartDataMonthly} providers={providers} /> */}
               

          
        </main>
  );
}