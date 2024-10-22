<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Provider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('providers')->get();

        // Pass the providers to the Inertia view
        return Inertia::render('Product/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $providers = Provider::all();
        return Inertia::render('Product/Create', [
            'providers' => $providers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $imageName = time().'.'.$request->image->extension();
        $request->image->move(public_path('images/products'), $imageName);
        
        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
        $product->image = 'images/products/'.$imageName;
        $product->save();
        // add providers to product
        $providers = $request->input('providers');
        // for loop to add each provider to the product
        foreach ($providers as $provider) {
            $product->providers()->attach($provider['id']);
        }
        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('Product/Show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $product = Product::with('providers')->find($product->id);
        $providers = Provider::all();
        return Inertia::render('Product/Edit', [
            'product' => $product,
            'providers' => $providers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,blob|max:2048',
        ]);

       

        if ($request->hasFile('image')) {
            // delete old image
            if ($product->image) {
                unlink(public_path($product->image));
            }
            // upload new image
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images/products'), $imageName);
            $product->image = 'images/products/'.$imageName;
        }

        $product->name = $request->name;
        $product->description = $request->description;
        $product->save();

        // Sync providers to product
        $providers = $request->input('providers', []);
        $product->providers()->sync(array_column($providers, 'id'));

        return redirect()->route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully');
    }
}
