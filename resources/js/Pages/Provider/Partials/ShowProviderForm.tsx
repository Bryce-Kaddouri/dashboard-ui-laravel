"use client"

import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { RgbColor } from 'react-colorful';

import {
    Trash2Icon,
    ChevronLeft,
} from "lucide-react"
import { PhoneInput, getPhoneData } from "@/Components/phone-imput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Provider } from "@/types";
import { Button } from '@/Components/ui/button';
import { ConfirmDeleteProviderDialog } from './ConfirmDeleteProviderDialog';
import { ColorPicker } from '@/Components/ui/color-picker';


export function ShowProviderForm() {
    const provider = usePage().props.provider as Provider;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data, setData, delete: deleteForm, errors, processing, recentlySuccessful } =
        useForm({
            name: provider.name,
            email: provider.email,
            phone: provider.phone,
            address: provider.address,
            color: { r: provider.red, g: provider.green, b: provider.blue } as RgbColor
        });
    

      const handleDeleteClick = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent the dropdown from closing
        setIsDialogOpen(true); // Open the confirmation dialog
      };
    return (
       
            <form className="space-y-8" method="post">
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
                        disabled
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>
               
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        disabled
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone" />

                    <PhoneInput 
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        disabled
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="color" value="Color" />
                <ColorPicker
                        disabled
                        className="mt-1 block w-full"
                        onChange={(v) => {
                            console.log(v);
                            setData('color', v);
                    }}
                        value={data.color}
                    />
                </div>

                 <div>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        required
                        autoComplete="address"
                        disabled
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>
                
                <div className="flex justify-start gap-4">
                        <ConfirmDeleteProviderDialog 
                    children={<Button variant="destructive" type="button" onClick={handleDeleteClick}>
                        <Trash2Icon className="h-4 w-4 mr-2" />
                        Delete
                    </Button>}
                    open={isDialogOpen}
                    onCancel={() => setIsDialogOpen(false)}
                    provider={provider}          />
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
