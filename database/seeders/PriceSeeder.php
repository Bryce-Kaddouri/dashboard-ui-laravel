<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Price;
use App\Models\Product;
use App\Models\Provider;
use Carbon\Carbon;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all products and providers
        $products = Product::all();
        $providers = Provider::all();

        // Check if there are products and providers
        if ($products->isEmpty() || $providers->isEmpty()) {
            return; // Exit if there are no products or providers
        }

        // Create prices for each product and provider
        foreach ($products as $product) {
            foreach ($providers as $provider) {
                Price::create([
                    'product_id' => $product->id,
                    'provider_id' => $provider->id,
                    'price' => rand(1000, 5000) / 100, // Random price between 10.00 and 50.00
                    'effective_date' => Carbon::now()->toDateString(), // Current date
                ]);
            }
        }
    }
}
