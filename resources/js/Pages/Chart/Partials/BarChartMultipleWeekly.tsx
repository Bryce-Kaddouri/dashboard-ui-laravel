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


export function BarChartMultipleWeekly({ data, providers }: { data: any[], providers: Provider[] }) {

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
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const year = new Date().getFullYear();
                const weekNumber = parseInt(value.split('-')[1], 10);
                const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
                const endDate = new Date(year, 0, 1 + weekNumber * 7 - 1);
                console.log(startDate)
                console.log(endDate)
                return `${startDate.toLocaleDateString("en-US")} - ${endDate.toLocaleDateString("en-US")}`;
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-auto"
                  nameKey="views"
                  labelFormatter={(value) => {
                    const year = new Date().getFullYear();
                const weekNumber = parseInt(value.split('-')[1], 10);
                const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
                const endDate = new Date(year, 0, 1 + weekNumber * 7 - 1);
                console.log(startDate)
                console.log(endDate)
                return `${startDate.toLocaleDateString("en-US")} - ${endDate.toLocaleDateString("en-US")}`;
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
