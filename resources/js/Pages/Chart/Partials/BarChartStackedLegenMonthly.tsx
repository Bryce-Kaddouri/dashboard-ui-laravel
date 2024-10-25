"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import { Provider } from "@/types"

export const description = "A stacked bar chart with a legend"



export function BarChartStackedLegendMonthly({ data, providers }: { data: any[], providers: Provider[] }) {

    console.log(data)
    console.log(providers)

      const chartConfig: ChartConfig = {} satisfies ChartConfig;

      for (let i = 0; i < providers.length; i++) {
        chartConfig[providers[i].name] = {
            label: providers[i].name,
            color: "hsl(var(--chart-" + (i + 1) + "))",
        }
      }
      console.log('chart config')
      console.log(chartConfig)


  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              }}
            />
            
            
            
            {Object.keys(chartConfig).map((provider, index) => (
                <Bar dataKey={provider} fill={chartConfig[provider].color}  radius={[0, 0, 0, 0]} stackId="a" />
            ))}

            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  }}
                />
              }
              cursor={false}
              defaultIndex={1}
            />
            <ChartLegend className="w-full overflow-x-auto" content={<ChartLegendContent className="w-full"/>} />
            </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
