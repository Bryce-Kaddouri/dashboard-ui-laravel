import React from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";

interface PriceInputProps {
  value: number;
  min: number;
  max?: number;
  name: string;
  id: string;
  onChange: (value: number) => void; // Changed onChange prop to use number
}

export function PriceInput({ value, min, max, name, id, onChange }: PriceInputProps) {
  // Removed local state for price
  // Regular expression to allow only valid numbers (with optional decimals)
  const priceRegex = /^[0-9]*[.]?[0-9]{0,2}$/;

  const handleIncrement = (currentPrice: number) => {
    const newPrice = currentPrice;
    if (max === undefined || newPrice + 1 <= max) {
      onChange?.(newPrice + 1); // Call onChange with new value
    }
  };

  const handleDecrement = (currentPrice: number) => {
    const newPrice = currentPrice;
    if (newPrice - 1 >= min) {
      onChange?.(newPrice - 1); // Call onChange with new value
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "" || priceRegex.test(newValue)) {
      onChange?.(parseFloat(newValue) || 0); // Call onChange with new value as number
    }
  };

  return (
    <div className="relative flex items-center">
      <Button
        variant="outline"
        onClick={() => handleDecrement(value)} // Pass current value
        className={cn(
          "absolute left-0 pl-3 pr-3 rounded-r-none h-full border-r-0"
        )}
      >
        –
      </Button>
      <Input
        type="text"
        value={value.toFixed(2)} // Use value prop directly and format to 2 decimal places
        onChange={handleChange}
        className={cn("text-center font-bold px-12")}
        name={name}
        id={id}
      />
      <Button
        variant="outline"
        onClick={() => handleIncrement(value)} // Pass current value
        className={cn(
          "absolute right-0 pl-3 pr-3 rounded-l-none h-full border-l-0"
        )}
      >
        +
      </Button>
    </div>
  );
}
