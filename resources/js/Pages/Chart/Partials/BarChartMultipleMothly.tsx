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
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area" // Import ScrollArea and ScrollBar
import { Provider } from "@/types"

export const description = "A multiple bar chart"


export function BarChartMultipleMonthly({ data, providers }: { data: any[], providers: Provider[] }) {

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
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-auto"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            {/* <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
            {Object.keys(chartConfig).map((provider, index) => (
                <Bar key={index} dataKey={provider} fill={chartConfig[provider].color} radius={4} />
            ))}
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
