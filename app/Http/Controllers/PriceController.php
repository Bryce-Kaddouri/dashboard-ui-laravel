<?php

namespace App\Http\Controllers;

use App\Models\Price;
use App\Models\Provider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PriceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $prices = Price::with('provider', 'product')->get();
        return Inertia::render('Price/Index', [
            'prices' => $prices,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $providers = Provider::with('products')->get();
        return Inertia::render('Price/Create', [
            'providers' => $providers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
        $request->validate([
            'price' => 'required|numeric|min:0',
            'effective_date' => 'required|date',
            'provider' => 'required',
            'product' => 'required',
        ]);

        
        
        $price = Price::create([
            'price' => $request->price,
            'effective_date' => \Carbon\Carbon::parse($request->effective_date)->format('Y-m-d'),
            'provider_id' => $request->provider['id'],
            'product_id' => $request->product['id'],
        ]);

        $price->save();
        
        
        return redirect()->route('prices.index')->with('success', 'Price created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Price $price)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Price $price)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Price $price)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Price $price)
    {
        //
    }
}
