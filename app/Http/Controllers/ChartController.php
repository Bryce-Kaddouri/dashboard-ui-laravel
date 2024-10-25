<?php

namespace App\Http\Controllers;

use App\Models\AreaChartLinearData;
use App\Models\Price;
use App\Models\Product;
use App\Models\Provider;
use App\Models\TrendProviderPriceByMonth;
use App\Models\TrendProviderPriceByMonthChartData;
use App\Models\TrendProviderPriceByWeek;
use App\Models\TrendProviderPriceByWeekChartData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function providerChart(Request $request)
    {
        $selectedProviders = null;
        if($request->providerIds){
            
            $selectedProviders = Provider::whereIn('id', $request->providerIds)->get();
            
        }
        $providers = Provider::all();
        if(!$selectedProviders){
            $monthlyTrends = TrendProviderPriceByMonth::all();
            $weeklyTrends = TrendProviderPriceByWeek::all();
            $selectedProviders = Provider::pluck('id')->toArray();
           

        }else{
            // dd($selectedProviders);
            $selectedProvidersIds = $selectedProviders->pluck('id')->toArray();
            $selectedProviders = Provider::whereIn('id', $selectedProvidersIds)->get()->pluck('id')->toArray();
            $monthlyTrends = TrendProviderPriceByMonth::whereIn('provider_id', $selectedProvidersIds)->get();
            // dd($monthlyTrends);
            $weeklyTrends = TrendProviderPriceByWeek::whereIn('provider_id', $selectedProvidersIds)->get();
            
        }
        
        $staticMonthly = new TrendProviderPriceByMonthChartData();
        $staticWeekly = new TrendProviderPriceByWeekChartData();

        $distinctMonthsArray = $monthlyTrends->unique('month')->pluck('month')->toArray();
        $distinctWeeksArray = $weeklyTrends->unique('week')->pluck('week')->toArray();
        $providersArray = $providers->toArray();

        // Handle date range filtering
        $dateRange = $request->date ?? null;
        if ($dateRange) {
            $monthlyTrends = $monthlyTrends->whereBetween('month', [$dateRange['from'], $dateRange['to']]);
            $weeklyTrends = $weeklyTrends->whereBetween('week', [$dateRange['from'], $dateRange['to']]);
        } else {
            // Use min and max dates if date range is not provided
            $minMonth = $monthlyTrends->min('month');
            $maxMonth = $monthlyTrends->max('month');
            $minWeek = $weeklyTrends->min('week');
            $maxWeek = $weeklyTrends->max('week');

            $monthlyTrends = $monthlyTrends->whereBetween('month', [$minMonth, $maxMonth]);
            $weeklyTrends = $weeklyTrends->whereBetween('week', [$minWeek, $maxWeek]);

            $dateRange = [
                'from' => $minMonth,
                'to' => $maxMonth,
            ];
        }


        $chartDataMonthly = $staticMonthly->getChartData($monthlyTrends, $distinctMonthsArray, $providersArray);
        $chartDataWeekly = $staticWeekly->getChartData($weeklyTrends, $distinctWeeksArray, $providersArray);

        return Inertia::render('Chart/ProviderChart', [
            'providers' => $providers,  
            'chart_data_monthly' => $chartDataMonthly,
            'chart_data_weekly' => $chartDataWeekly,
            'date' => $dateRange,
            'selected_providers' => $selectedProviders,
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function productChart(Request $request)
    {
        $product = null;
        $dateRange = null;
        if($request->productId){
           
            $product = Product::find($request->productId);
        }
        

        $products = Product::all();
        if($product){
            $prices = Price::where('product_id', $product->id)
            ->with('provider') // Keep the provider relationship
            ->orderBy('effective_date', 'asc');
            
            if($request->date){
                $dateRange = $request->date;
                if(isset($dateRange['from']) && isset($dateRange['to'])){
                    $prices = $prices->whereDate('effective_date', '>=', \Carbon\Carbon::parse($dateRange['from'])->format('Y-m-d'))
                    ->whereDate('effective_date', '<=', \Carbon\Carbon::parse($dateRange['to'])->format('Y-m-d'));
                }else if (isset($dateRange['to'])){
                    $prices = $prices->whereDate('effective_date', '<=', \Carbon\Carbon::parse($dateRange['to'])->format('Y-m-d'));
                }else if (isset($dateRange['from'])){
                    $prices = $prices->whereDate('effective_date', '>=', \Carbon\Carbon::parse($dateRange['from'])->format('Y-m-d'));
                }
                
            }else{
                $minDate = $prices->min('effective_date');
             $maxDate = $prices->max('effective_date');
             $prices = $prices->whereBetween('effective_date', [$minDate, $maxDate]);
             $dateRange = [
                'from' => $minDate,
                'to' => $maxDate,
             ];
            }

             // get min date and max date
             

            $prices = $prices->get();

            // distinct on effective_date
            $distinctDates = $prices->unique('effective_date')->values();
            $distinctDatesArray = [
                
            ];

            foreach($distinctDates as $date){
                $distinctDatesArray[] = $date->effective_date;
            }

            $statistic = new AreaChartLinearData();
            $chartData = $statistic->getChartData($prices, $distinctDatesArray, $product->providers->toArray());
            
        }else{
            $prices  = Price::all();
        }
        if(!$product){
            return Inertia::render('Chart/ProductChart', [
                'products' => $products,
            ]);
        }



        return Inertia::render('Chart/ProductChart', [
            'products' => $products,
            'product' => $product,
            'chart_data' => $chartData,
            'providers' => $product->providers->toArray(),
            'date' => $dateRange,
        ]);
    }

}
