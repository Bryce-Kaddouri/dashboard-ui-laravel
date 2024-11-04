"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"

interface DatePickerWithRangeProps {
  className?: string;
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void; // Changed setDate to onDateChange
}

export function DatePickerWithRange({
  className,
  date,
  onDateChange, // Updated prop name
}: DatePickerWithRangeProps) {
  const [selectedDate, setSelectedDate] = React.useState<DateRange | undefined>(date);
  const [open, setOpen] = React.useState(false);
  const handleApply = () => {
    
    onDateChange(selectedDate);
  };

  const handleReset = () => {
    setSelectedDate(undefined);
    onDateChange(undefined);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {selectedDate?.from ? (
              selectedDate.to ? (
                <>
                  {format(selectedDate.from, "LLL dd, y")} -{" "}
                  {format(selectedDate.to, "LLL dd, y")}
                </>
              ) : (
                format(selectedDate.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selectedDate?.from}
            selected={selectedDate}
            
            
            onSelect={(date) => {
              setSelectedDate(date);
              console.log(date);
              
            }} // Update local state on select
            numberOfMonths={2}
          />
          <div className="flex justify-end mt-2 p-2">
            <Button onClick={handleApply}>Apply</Button>
            <Button onClick={handleReset} variant="outline" className="ml-2">Reset</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
