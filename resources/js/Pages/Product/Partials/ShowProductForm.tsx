"use client"

import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

import {
    Trash2Icon,
    ChevronLeft,
} from "lucide-react"
import { PhoneInput, getPhoneData } from "@/Components/phone-imput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Product, Provider } from "@/types";
import { Button } from '@/Components/ui/button';
import { ConfirmDeleteProductDialog } from './ConfirmDeleteProductDialog';


export function ShowProductForm() {
    const product = usePage().props.product as Product;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data, setData, delete: deleteForm, errors, processing, recentlySuccessful } =
        useForm({
            name: product.name,
            description: product.description,
            image: product.image,
        });
    

      const handleDeleteClick = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent the dropdown from closing
        setIsDialogOpen(true); // Open the confirmation dialog
      };
    return (
       
            <form className="space-y-8" method="post">
                <div>
                    <img src={`${window.location.origin}/${product.image}`} alt="Product Image" width={100} height={100} />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        required
                        isFocused
                        autoComplete="name"
                        disabled
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
                        required
                        autoComplete="description"
                        disabled
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>
                
                <div className="flex justify-start gap-4">
                        <ConfirmDeleteProductDialog 
                    children={<Button variant="destructive" type="button" onClick={handleDeleteClick}>
                        <Trash2Icon className="h-4 w-4 mr-2" />
                        Delete
                    </Button>}
                    open={isDialogOpen}
                    onCancel={() => setIsDialogOpen(false)}
                    product={product}          />
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
