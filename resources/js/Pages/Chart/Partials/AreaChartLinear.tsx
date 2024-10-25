"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import { Price, Provider } from "@/types"





export const description = "A linear area chart"

 const chartData = [
  { date: "2024-04-02", "Gleichner, Hartmann and Baumbach": 186, "Gulgowski-Donnelly": 80 },
  { date: "2024-04-03", "Gleichner, Hartmann and Baumbach": 305, "Gulgowski-Donnelly": 200 },
  { date: "2024-04-04", "Gleichner, Hartmann and Baumbach": 237, "Gulgowski-Donnelly": 120 },
  { date: "2024-04-05", "Gleichner, Hartmann and Baumbach": 73, "Gulgowski-Donnelly": 190 },
  { date: "2024-04-06", "Gleichner, Hartmann and Baumbach": 209, "Gulgowski-Donnelly": 130 },
  { date: "2024-04-07", "Gleichner, Hartmann and Baumbach": 214, "Gulgowski-Donnelly": 130 },
  { date: "2024-04-08", "Gleichner, Hartmann and Baumbach": 214, "Gulgowski-Donnelly": 140 },

] 

type AreaChartLinearData = {
    effective_date: Date;       
    [key: string]: Date | number; 
}

// Define the type for chartConfig to allow string indexing





export function AreaChartLinear({ data, providers }: { data: any[], providers: Provider[] }) {
    console.log(data)
    console.log(providers)

      const chartConfig: ChartConfig = {} satisfies ChartConfig;

      for (let i = 0; i < providers.length; i++) {
        const red: number = providers[i].red;
        const green: number = providers[i].green;
        const blue: number = providers[i].blue;
        console.log('red')
        console.log(red)
        console.log('green')
        console.log(green)
        console.log('blue')
        console.log(blue)
        chartConfig[providers[i].name] = {
            label: providers[i].name,
            color: "rgb(" + red + "," + green + "," + blue + ")",
        }
        console.log('chart config')
        console.log(chartConfig)
      }
      console.log('chart config from function')
      console.log(chartConfig)


    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Linear</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
           
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              }}/>}
            />

            {Object.keys(chartConfig).map((provider, index) => (
                <Area
                    dataKey={provider}
                    type="linear"
                    fill={chartConfig[provider].color}
                    fillOpacity={0.4}
                    stroke={chartConfig[provider].color}
                    stackId="index"
                />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
