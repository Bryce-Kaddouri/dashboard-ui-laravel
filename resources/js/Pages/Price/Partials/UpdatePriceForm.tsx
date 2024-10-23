 
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/Components/ui/button"
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { Check, ChevronsUpDown, Trash } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import {
    CameraIcon,
    ChevronLeft,
    UploadIcon,
} from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import { PhoneInput, getPhoneData } from "@/Components/phone-imput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { Price, Product, Provider } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { DatePickerWithPresets } from "@/Components/ui/date-picker";
import { PriceInput } from "@/Components/ui/price-input";

export function UpdatePriceForm({ providers}: { providers: Provider[] }) {
    console.log("price")
    const price = usePage().props.price as Price;
    console.log(price)
    
    
    

    const [providerOpen, setProviderOpen] = useState(false) // Separate state for provider popover
    const [productOpen, setProductOpen] = useState(false) // Separate state for product popover

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            price: Number(price.price),
            effective_date: price.effective_date,
            provider_id: price.provider.id,
            product_id: price.product.id,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        console.log("submit")

       


        patch(route('prices.update', price.id)); 
    };
    console.log("data")
    console.log(data.provider_id)

    return (
        <form onSubmit={submit} className="space-y-8" method="post" onChange={(e) => console.log(e)}>
            <div>
                <InputLabel htmlFor="price" value="Price" />

                {/* <Input
                    type="number"
                    min={100}
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                /> */}
                <PriceInput value={data.price} min={0} name="price" id="price" onChange={(value) => setData('price', value)} />

                <InputError className="mt-2" message={errors.price} />
            </div>

            <div>
                <InputLabel htmlFor="effective_date" value="Effective Date" />

                <DatePickerWithPresets value={data.effective_date} name="effective_date" id="effective_date" onChange={(value) => setData('effective_date', value)} />

                <InputError className="mt-2" message={errors.effective_date} />
            </div>

            <div className="w-full">
                <Popover open={providerOpen} onOpenChange={setProviderOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={providerOpen}
                            className="justify-between w-full"
                        >
                            {data.provider_id ? providers.find(provider => provider.id === data.provider_id)?.name : "Select provider..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0 w-full">
                        <Command>
                            <CommandInput 
                                placeholder="Search provider..." 
                            />
                            <CommandList>
                                <CommandEmpty>No provider found.</CommandEmpty>
                                <CommandGroup>
                                    {providers.map((provider) => (
                                        <CommandItem
                                            key={provider.id}
                                            value={provider.name}
                                            onSelect={(currentValue) => {
                                                setData('provider_id', provider.id)
                                                setProviderOpen(false) // Close provider popover
                                                console.log()
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    data.provider_id === provider.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {provider.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <InputError className="mt-2" message={errors.provider_id} />
            </div>
            <div className="w-full">
                <Popover open={productOpen} onOpenChange={setProductOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={productOpen}
                            className="justify-between w-full"
                            disabled={!data.provider_id} // Disable if provider is not selected
                        >
                            {data.product_id ? providers.find(provider => provider.id === data.provider_id)?.products.find(product => product.id === data.product_id)?.name : "Select product..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-full">
                        <Command>
                            <CommandInput 
                                placeholder="Search product..." 
                                disabled={!data.provider_id} // Disable input if provider is not selected
                            />
                            <CommandList>
                                <CommandEmpty>No product found.</CommandEmpty>
                                <CommandGroup>
                                    {providers.find(provider => provider.id === data.provider_id)?.products.map((product) => (
                                        <CommandItem
                                            key={product.id}
                                            value={product.name}
                                            onSelect={(currentValue) => {
                                                console.log(currentValue)
                                                setData('product_id', product.id)
                                                setProductOpen(false) // Close product popover
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    data.product_id === product.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {product.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <InputError className="mt-2" message={errors.product_id} />
            </div> 

            <div className="flex justify-start gap-4">
                <Button type="submit">Submit</Button>

                <form action={route('prices.index')}>
                    <Button variant="outline" type="submit">
                        <ChevronLeft className="h-4 w-4" />
                        Back to list
                    </Button>
                </form>
            </div>
        </form>
    )
}
