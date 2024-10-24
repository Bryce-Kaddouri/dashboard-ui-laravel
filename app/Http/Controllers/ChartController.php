<?php

namespace App\Http\Controllers;

use App\Models\AreaChartLinearData;
use App\Models\Price;
use App\Models\Product;
use App\Models\Provider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function providerChart()
    {
        $providers = Provider::all();
        return Inertia::render('Chart/ProviderChart', [
            'providers' => $providers,
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
        
        
        /* $products = Product::with('prices.provider')
            ->get();
        foreach ($products as $product) {
            $product->prices->groupBy('effective_date');
        }
        dd($products); */

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
