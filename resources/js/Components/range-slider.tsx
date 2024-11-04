import {Slider} from "@nextui-org/slider";
export default function RangeSlider({minValue, maxValue, step, label, defaultValue, className, onChange}: {minValue: number, maxValue: number, step: number, label: string, defaultValue: [number, number], className: string, onChange: (value: [number, number]) => void}) {
  return (
    <Slider 
      size="sm"
      label={label}
      step={step} 
      minValue={minValue} 
      maxValue={maxValue} 
      defaultValue={defaultValue} 
      formatOptions={{style: "currency", currency: "EUR"}}
      className={className}
      onChange={(value) => onChange(value as [number, number])}
    />
  );
}