<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all providers from the database
        $providers = Provider::with('products')->paginate(10);

        // Pass the providers to the Inertia view
        return Inertia::render('Provider/Index', [
            'pagination' => $providers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Provider/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:providers,email',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);
        Provider::create($request->all());
        
        
        return redirect()->route('providers.index')->with('success', 'Provider created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Provider $provider)
    {
        return Inertia::render('Provider/Show', [
            'provider' => $provider,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Provider $provider)
    {
        return Inertia::render('Provider/Edit', [
            'provider' => $provider,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Provider $provider)
    {
        $provider->update($request->all());
        return redirect()->route('provider.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Provider $provider)
    {
        $provider->delete();
        return redirect()->route('provider.index');
    }
}
