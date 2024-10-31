"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/Components/ui/button"
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { Check, ChevronsUpDown, Trash, MailCheck, CrossIcon, CircleX, ChevronRightIcon } from "lucide-react"

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
import { User } from "@/types";
import ResetPassword from "@/Pages/Auth/ResetPassword";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/Components/ui/toast"
import { Alert, AlertClose, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
export function EditUserForm() {
    

    const [roleOpen, setRoleOpen] = useState(false) // Separate state for role popover
    const roles  = usePage().props.roles as string[];
    const user = usePage().props.user as User;
    const status = usePage().props.status as string;
    const [showAlert, setShowAlert] = useState(true);
    console.log("status");
    console.log(status);
    console.log("showAlert");
    console.log(showAlert);
    
    
    console.log(roles);

    const { data, setData, patch,post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            role: user.role,
            
        });

        const resetPasswordSubmit: FormEventHandler = (e) => {
            e.preventDefault();
            console.log(data);
            console.log("submit reset password")
    
           
    
    
            post(route('password.email'));
        };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);

       


        patch(route('users.update', user.id)); 
    };

    console.log('status', status);

    return (
        <div>
             {status && showAlert && (
                <Alert variant="success" className="flex flex-row gap-4" >
                <MailCheck className="h-8 w-8" />
                <div className="flex flex-col w-full">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  {status}
                </AlertDescription>
                </div>
                <div>
                <Button variant="outline" size="icon" onClick={() => setShowAlert(false)}>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
                </div>
              </Alert>
            )}
            <form className="space-y-8" onSubmit={resetPasswordSubmit}>


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
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />


                <InputError className="mt-2" message={errors.email} />
            </div>
{/* 
            <div className="w-full">
                <InputLabel htmlFor="current_password" value="Current Password" />

                <InputPassword
                    className="w-full"
                    type="password"
                    value={data.current_password}
                    onChange={(e) => setData('current_password', e.target.value)}
                />

                <InputError className="mt-2" message={errors.current_password} />
            </div>

            <div className="w-full">
                <InputLabel htmlFor="new_password" value="New Password" />

                <InputPassword
                    className="w-full"
                    type="password"
                    value={data.new_password}
                    onChange={(e) => setData('new_password', e.target.value)}
                />
                <InputError className="mt-2" message={errors.new_password} />
            </div>

            <div className="w-full">
                <InputLabel htmlFor="new_confirm_password" value="New Confirm Password" />

                <InputPassword
                    className="w-full"
                    type="password"
                    value={data.new_confirm_password}
                    onChange={(e) => setData('new_confirm_password', e.target.value)}
                />
                <InputError className="mt-2" message={errors.new_confirm_password} />
            </div> */}

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
                <Button type="button" onClick={submit} disabled={processing}>Submit</Button>

                <Button type="button" onClick={resetPasswordSubmit} disabled={processing}>Reset Password</Button>

                <form action={route('providers.index')}>
                    <Button variant="outline" type="submit">
                        <ChevronLeft className="h-4 w-4" />
                        Back to list
                    </Button>
                </form>
            </div>
        </form>
        </div>
    )
}
