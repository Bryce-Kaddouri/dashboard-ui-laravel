"use client"
 
import { Button } from "@/Components/ui/button"
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import {
    ChevronLeft,
} from "lucide-react"
import { PhoneInput, getPhoneData } from "@/Components/phone-imput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Provider } from "@/types";


export function UpdateProviderForm() {
    const provider = usePage().props.provider as Provider;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: provider.name,
            email: provider.email,
            phone: provider.phone,
            address: provider.address
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);

        patch(route('providers.update', provider.id));
    };
    return (
       
            <form onSubmit={submit} className="space-y-8" method="post">
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
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone" />

                    <PhoneInput 
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.phone} />
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
                    />

                    <InputError className="mt-2" message={errors.address} />
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
