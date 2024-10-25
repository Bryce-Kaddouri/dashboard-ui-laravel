'use client';

import { forwardRef, useMemo, useState } from 'react';
import { HexColorPicker, RgbColorPicker, RgbColor } from 'react-colorful';
import { cn } from '@/lib/utils';
import { useForwardedRef } from '@/lib/use-forwarded-ref';
import type { ButtonProps } from '@/Components/ui/button';
import { Button } from '@/Components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/Components/ui/popover';
import { Input } from '@/Components/ui/input';

interface ColorPickerProps {
  value: RgbColor; // Change value type to RgbColor
  onChange: (value: RgbColor) => void; // Change onChange type to accept RgbColor
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const parsedValue = useMemo(() => {
      return value ? `#${((1 << 24) + (value.r << 16) + (value.g << 8) + value.b).toString(16).slice(1)}` : '#FFFFFF';
    }, [value]);

    const handleColorChange = (newColor: RgbColor) => {
      onChange(newColor);
    };

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className={cn('block', className)}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
            size='icon'
            style={{
              backgroundColor: parsedValue,
            }}
            variant='outline'
          >
            <div />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full'>
          <RgbColorPicker color={value} onChange={handleColorChange} />
          <Input
            maxLength={7}
            onChange={(e) => {
              const colorValue = e?.currentTarget?.value;
              const hex = colorValue.replace('#', '');
              const bigint = parseInt(hex, 16);
              const r = (bigint >> 16) & 255;
              const g = (bigint >> 8) & 255;
              const b = bigint & 255;
              onChange({ r, g, b }); // Update onChange to use RgbColor
            }}
            ref={ref}
            value={parsedValue}
          />
          <Input
            readOnly
            value={`rgb(${value.r}, ${value.g}, ${value.b})`}
            className="mt-2"
          />
        </PopoverContent>
      </Popover>
    );
  }
);
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
