"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/Components/ui/button"
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { Check, ChevronsUpDown, Trash } from "lucide-react"

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
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { DatePickerWithPresets } from "@/Components/ui/date-picker";
import { PriceInput } from "@/Components/ui/price-input";
import { usePage } from "@inertiajs/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { InputPassword } from "@/Components/ui/input-password";

export function CreateUserForm() {
    const [roleOpen, setRoleOpen] = useState(false) // Separate state for role popover
    const roles  = usePage().props.roles as string[];
    console.log(roles);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            role: null as string | null,
            _token: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        console.log("submit")

       


        post(route('users.store')); 
    };

    return (
        <form onSubmit={submit} className="space-y-8" method="post" onChange={(e) => console.log(e)}>
            <input type="hidden" name="_token" value={data._token || ''} />

            <div className="w-full">
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                
                    className="w-full"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError className="mt-2" message={errors.name} />
            </div>
            
            <div className="w-full">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    className="w-full"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError className="mt-2" message={errors.email} />
            </div>

            <div className="w-full">
                <InputLabel htmlFor="password" value="Password" />

                <InputPassword
                    className="w-full"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />

                <InputError className="mt-2" message={errors.password} />
            </div>

            <div className="w-full">
                <InputLabel htmlFor="confirm_password" value="Confirm Password" />

                <InputPassword
                    className="w-full"
                    type="password"
                    value={data.confirm_password}
                    onChange={(e) => setData('confirm_password', e.target.value)}
                />
                <InputError className="mt-2" message={errors.confirm_password} />
            </div>

            <div className="w-full">
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {data.role || "Select Role"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full" sideOffset={10} align="start">
                        {Object.values(roles).map((role) => (
                            <DropdownMenuItem
                                className="w-full min-w-lg"
                                key={role}
                                onClick={() => setData('role', role)}
                            >
                                {role}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <InputError className="mt-2" message={errors.role} />
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
