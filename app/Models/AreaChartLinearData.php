<?php

namespace App\Models;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AreaChartLinearData extends Model
{
    use HasFactory;

    protected $fillable = ['date'];

    // Dynamic provider data can be added as key-value pairs
    /**
     * @param Collection<int, Price> $prices
     */
    public static function getChartData(Collection $prices, array $distinctDates, array $providers): Collection
    {
        $chartData = collect([]);

        foreach($distinctDates as $date){
            $dataPoint = [
                'date' => $date,
            ];
            $pricesForDate = $prices->where('effective_date', $date);
            foreach($pricesForDate as $price){
                $dataPoint[$price->provider->name] = $price->price;
            }
            foreach($providers as $provider){
                if(!isset($dataPoint[$provider['name']])){
                    // check if the provider was in the price for the previous date
                    $previousDate = $chartData->where('date', '<', $date)->last();
                    if(isset($previousDate[$provider['name']])){
                        $dataPoint[$provider['name']] = $previousDate[$provider['name']];
                    }else{
                        
                    }
                }
            }
            $chartData->push($dataPoint);
        }

        
        return $chartData;
    }
    

}
