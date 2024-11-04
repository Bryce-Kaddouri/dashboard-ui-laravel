"use client"

import * as React from "react"
import { DollarSign } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"
import { Label } from "@/Components/ui/label"

export default function PriceRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [priceRange, setPriceRange] = React.useState<{ min: number; max: number } | undefined>()

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setPriceRange(prev => {
      if (prev) {
        return { min: value, max: Math.max(value, prev.max) }
      }
      return { min: value, max: 0 }
    })
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setPriceRange(prev => {
      if (prev) {
        return { min: prev.min, max: Math.max(value, prev.min) }
      }
      return { min: 0, max: value }
    })
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="price"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !priceRange && "text-muted-foreground"
            )}
          >
            <DollarSign className="mr-2 h-4 w-4" />
            {priceRange ? (
              <>
                ${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}
              </>
            ) : (
              <span>Select price range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="min-price">Minimum Price</Label>
              <Input
                id="min-price"
                placeholder="0.00"
                type="number"
                min={0}
                step={0.01}
                onChange={handleMinChange}
                value={priceRange?.min || ''}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max-price">Maximum Price</Label>
              <Input
                id="max-price"
                placeholder="1000.00"
                type="number"
                min={priceRange?.min || 0} // Ensure max is not lower than min
                step={0.01}
                onChange={handleMaxChange}
                value={priceRange?.max || ''}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}