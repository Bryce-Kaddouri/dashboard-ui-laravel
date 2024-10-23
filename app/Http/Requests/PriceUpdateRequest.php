<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PriceUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'price' => ['required', 'numeric', 'min:0'],
            'effective_date' => ['required', 'date'],
            'provider_id' => ['required', 'exists:providers,id'],
            'product_id' => [
                'required',
                'exists:products,id',
                function ($attribute, $value, $fail) {
                    $providerId = $this->input('provider_id');
                    $provider = \App\Models\Provider::find($providerId);
                    $selectedProduct = \App\Models\Product::find($value);
                    $product = $provider->products->find($selectedProduct->id);
                  
                    
                    
                    if (!$product) {
                        $fail('The selected product must be linked to the selected provider.');
                    }
                },
            ],
        ];
    }
}