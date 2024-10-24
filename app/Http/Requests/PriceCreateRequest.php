<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PriceCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'price' => ['required', 'numeric', 'min:0'],
            'effective_date' => ['required', 'date', 'unique:prices,effective_date,NULL,id,provider_id,' . $this->input('provider_id') . ',product_id,' . $this->input('product_id')],
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
