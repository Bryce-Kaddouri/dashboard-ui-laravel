"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/Components/ui/button"
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import {
    ChevronLeft,
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


 const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().min(0),
    address: z.string().min(2).max(50),
}) 

export function CreateProviderForm() {
   /*  const form =
    useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
      const phoneData = getPhoneData(values.phone);

      if (!phoneData.isValid) {
        form.setError("phone", {
            type: "manual",
            message: "Invalid phone number",
        });
        console.log('errors');
        console.log(form.formState.errors);
        return;
    }

    console.log('no errors');
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };

    const url = route('providers.store');
    console.log(url);
    console.log(requestOptions);
    fetch(route('providers.store'), requestOptions); 


      

    } */

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            phone: "",
            address: ""
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);

        post(route('providers.store'));
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
