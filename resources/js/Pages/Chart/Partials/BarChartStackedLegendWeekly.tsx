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



export function BarChartStackedLegendWeekly({ data, providers }: { data: any[], providers: Provider[] }) {

    console.log(data)
    console.log(providers)

      const chartConfig: ChartConfig = {} satisfies ChartConfig;

      for (let i = 0; i < providers.length; i++) {
        const red: number = providers[i].red;
        const green: number = providers[i].green;
        const blue: number = providers[i].blue;
        chartConfig[providers[i].name] = {
            label: providers[i].name,
            color: "rgb(" + red + "," + green + "," + blue + ")",
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
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
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
            
            
            
            {Object.keys(chartConfig).map((provider, index) => (
                <Bar dataKey={provider} fill={chartConfig[provider].color}  radius={[0, 0, 0, 0]} stackId="a" />
            ))}

            <ChartTooltip
              content={
                <ChartTooltipContent
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
