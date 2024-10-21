"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/Components/ui/button"
import { useForm } from '@inertiajs/react';
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
import { Provider } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export function CreateProductForm({ providers }: { providers: Provider[] }) {
    const [imageURL, setImageURL] = useState<string | null>(null);
    // providers variable, empty array
    const [selectedProviders, setSelectedProviders] = useState<Provider[]>([]);
    const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [searchQuery, setSearchQuery] = useState("");

  const handleUploadComplete = (url: string) => {
    setImageURL(url);
  };
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            image: null as File | null,
            name: "",
            description: "",
            providers: [] as Provider[],
            
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);

        post(route('products.store'));
    };

    // function change url to set with temp url
    const changeURL = (files:FileList | null) => {
        if (!files) return;
        // get the first file from the list
        const file = files.item(0);
        if (!file) return;
        const imageUrl = URL.createObjectURL(file);
        setImageURL(imageUrl);
        setData('image', file);
    }
    
    return (
       
        <form onSubmit={submit} className="space-y-8" method="post" encType="multipart/form-data">
             


                <div>
                    <InputLabel htmlFor="image" value="Image" />
                    <Input id="image" type="file" onChange={(e) => changeURL(e.target.files)}/>
                    {/* preview image */}
                    {imageURL && (
                        <img src={imageURL} alt="Uploaded Image" width={100} height={100} />
                    )}
                    

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
                                                !selectedProviders.some(selected => selected.id === provider.id) // Exclude already selected providers
                                            )
                                            .map((provider) => (
                                                <CommandItem
                                                    key={provider.id}
                                                    value={provider.name}
                                                    onSelect={(currentValue) => {
                                                        // add item to selected providers
                                                        setSelectedProviders([...selectedProviders, provider]);
                                                        // add to providers array
                                                        setData('providers', [...data.providers, provider]); // Use provider instead of provider.id
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedProviders.includes(provider) ? "opacity-100" : "opacity-0"
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
                    <div className="flex flex-col gap-2 py-2">
                        {/* display selected providers */}
                        
                        {(() => {
                            const elements = [];
                            for (let i = 0; i < selectedProviders.length; i++) {
                                const provider = selectedProviders[i];
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
                                                        setSelectedProviders(selectedProviders.filter(selected => selected.id !== provider.id));
                                                        // remove from providers array
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
                   
                    <form action={route('providers.index')}>
                        <Button variant="outline" type="submit">
                            <ChevronLeft className="h-4 w-4" />
                            Back to list
                        </Button>
                    </form>
                </div>
                
            </form>
    )
}
