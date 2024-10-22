"use client"
 
import { Button } from "@/Components/ui/button"
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

import {
    ChevronLeft,
    ChevronsUpDown,
    Trash,
} from "lucide-react"
import { PhoneInput, getPhoneData } from "@/Components/phone-imput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Product, Provider } from "@/types";
import { Input } from "@/Components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import { Card } from "@/Components/ui/card";


export function UpdateProductForm({ providers }: { providers: Provider[] }) {
    const product = usePage().props.product as Product;
    console.log(product);
    // providers variable, empty array
    const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [imageURL, setImageURL] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            image: null as File | null,
            name: product.name,
            description: product.description,
            providers: product.providers,
            
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('submit');
        console.log(e);
        console.log(data);

        patch(route('products.update', product.id));
    };

    // function change url to set with temp url
    

    console.log(product.image);
    const onChange = (e: any) => {
        // check if image is changed
       console.log('change');
       console.log(data);
    }

    

   
    
    return (
       
        <form onSubmit={submit} className="space-y-8" method="post" encType="multipart/form-data" onChange={onChange}>
                <div>
                    <InputLabel htmlFor="image" value="Image" />
                    <Input id="image" type="file" onChange={(e) => {
                        console.log('change');
                        const files = e.target.files;
                        if (!files) return;
                        // get the first file from the list
                        const file = files.item(0);
                        if (!file) return;
                        setImageURL(URL.createObjectURL(file));
                        setData('image', file);
                        
                        
                        
                    }} />
                    {/* <Input id="image" type="file" onChange={(e) => changeURL(e.target.files)}/> */}
                    
                    {/* preview image */}
                    {imageURL ? (
                        <img src={imageURL} alt="Uploaded Image" width={100} height={100} />
                    ) : product.image ? (
                        <img src={`${window.location.origin}/${product.image}`} alt="Product Image" width={100} height={100} />
                    ) : null}
                    

                    <InputError className="mt-2" message={errors.image} />
                </div>

               <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>
               
                <div>
                    <InputLabel htmlFor="description" value="Description" />

                    <TextInput
                        id="description"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        required
                        autoComplete="description"
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>

                <div className="w-full">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="justify-between w-full"
                            >
                                {value
                                    ? providers.find((provider) => provider.name === value)?.name
                                    : "Select provider..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0 w-full">
                            <Command>
                                <CommandInput 
                                    placeholder="Search provider..." 
                                    onValueChange={(value) => setSearchQuery(value)} // Update search query
                                />
                                <CommandList>
                                    <CommandEmpty>No provider found.</CommandEmpty>
                                    <CommandGroup>
                                        {providers
                                            .filter(provider => 
                                                provider.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
                                                !data.providers.some(selected => selected.id === provider.id) // Exclude already selected providers
                                            )
                                            .map((provider) => (
                                                <CommandItem
                                                    key={provider.id}
                                                    value={provider.name}
                                                    onSelect={(currentValue) => {
                                                        // add item to selected providers
                                                        // add to providers array
                                                        setData('providers', [...data.providers, provider]); // Use provider instead of provider.id
                                                    }}
                                                >
                                                
                                                    {provider.name}
                                                </CommandItem>
                                            ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <div className="flex flex-col gap-2 py-2">
                        {/* display selected providers */}
                        
                        {(() => {
                            const elements = [];
                            for (let i = 0; i < data.providers.length; i++) {
                                const provider = data.providers[i];
                                elements.push(
                                    <div key={provider.id}>
                                        <input 
                                            type="hidden"
                                            name={`provider-${i}`} 
                                            value={provider.id} 
                                        />
                                        <Card className="w-full flex justify-center items-center rounded-md p-4">
                                        <div className="w-full pr-4">
                                                    <span>{provider.name}</span>
                                                </div>
                                                <div className="">
                                                <Button 
                                                    variant="outline" 
                                                    className="bg-red-500 text-white hover:bg-red-600 hover:text-white w-10 h-10 p-0" 
                                                    onClick={() => {
                                                        setData('providers', data.providers.filter(provider => provider.id !== provider.id));
                                                    }}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>
                                );
                            }
                            return elements;
                        })()}
                    
                    </div>
                </div>

                

                
                <div className="flex justify-start gap-4">
                   
                    <Button type="submit">Submit</Button>
                   
                    <form action={route('products.index')}>
                        <Button variant="outline" type="submit">
                            <ChevronLeft className="h-4 w-4" />
                            Back to list
                        </Button>
                    </form>
                </div>
                
            </form>
    )
}
