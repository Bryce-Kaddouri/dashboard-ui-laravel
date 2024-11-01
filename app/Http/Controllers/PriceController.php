<?php

namespace App\Http\Controllers;

use App\Http\Requests\PriceCreateRequest;
use App\Models\Price;
use App\Models\Provider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

use Inertia\Inertia;
use App\Http\Requests\PriceUpdateRequest;


class PriceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // create an array with the query parameters key and the type of the value
        $query = [
            'orderBy' => 'string',
            'direction' => 'string',
            'pageSize' => 'integer',
            'page' => 'integer',
            'search' => 'string',
        ];
        $query = request()->query();
        // check if the query parameters are in the array and if the type is the same as the value
        foreach($query as $key => $value){
            if(!in_array($key, array_keys($query)) || !is_string($value)){
                dd($key, $value);
            }
        }
        
        // dd($reqs);
        $orderDirection = 'desc';
        $orderBy = 'effective_date';
        $pageSize = 40;
        $search = '';
        
        if(isset($query['pageSize'])){
            $pageSize = $query['pageSize'];
        }
        $page = 0;
        if(isset($query['page'])){
            $page = $query['page'];
        }
        if(isset($query['orderBy'])){
            $orderBy = $query['orderBy'];
        }
        if(isset($query['direction'])){
            $orderDirection = $query['direction'];
        }
        if(isset($query['search'])){
            $search = $query['search'];
            
        }
        
        $prices = Price::with('provider', 'product')
            // join the product table to get the product name
            ->join('products', 'prices.product_id', '=', 'products.id')
            ->join('providers', 'prices.provider_id', '=', 'providers.id')
            ->select('prices.*', 'products.name as product', 'providers.name as provider')
            ->where(function($query) use ($search) {
                $query->where('prices.price', 'like', "%{$search}%")
                      ->orWhere('prices.id', 'like', "%{$search}%")
                      ->orWhere('products.name', 'like', "%{$search}%")
                      ->orWhere('providers.name', 'like', "%{$search}%");
            })
            ->orderBy($orderBy, $orderDirection)
             ->paginate($pageSize, ['*'], 'page', $page); 
            
        


        
            

        
           
            
        
        return Inertia::render('Price/Index', [
            'prices' => $prices,
            'query' => $query,
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
    public function store(PriceCreateRequest $request)
    {
        $request->validated();
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

        return Redirect::route('prices.index');
        
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Price $price)
    {
        $price = Price::with('provider', 'product')->find($price->id);
        return Inertia::render('Price/Show', [
            'price' => $price,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Price $price)
    {
        $providers = Provider::with('products')->get();
        $price = Price::with('provider', 'product')->find($price->id);

        // Eager load products for the selected provider
        if ($price->provider) {
            $price->provider->load('products');
        }

        return Inertia::render('Price/Edit', [
            'price' => $price,
            'providers' => $providers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PriceUpdateRequest $request, Price $price): RedirectResponse
    {
         $request->validated();
       

        $price->update([
            'price' => $request->price,
            'effective_date' => \Carbon\Carbon::parse($request->effective_date)->format('Y-m-d'),
            'provider_id' => $request->provider_id,
            'product_id' => $request->product_id,
        ]);
        return redirect()->route('prices.index')->with('success', 'Price updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Price $price)
    {
        $price->delete();
        return redirect()->route('prices.index')->with('success', 'Price deleted successfully');
    }
}
