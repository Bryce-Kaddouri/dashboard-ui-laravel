"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/Components/ui/button"
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { Check, ChevronsUpDown, Trash, MailCheck, CrossIcon, CircleX, ChevronRightIcon, Trash2Icon } from "lucide-react"

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
import { ConfirmDeleteUserDialog } from "./ConfirmDeleteUserDialog";
export function ShowUserForm() {
    

    const roles  = usePage().props.roles as string[];
    const user = usePage().props.user as User;
   
    
    
    console.log(roles);

    const { data, setData, patch,post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            role: user.role,
            
        });
        const [isDialogOpen, setIsDialogOpen] = useState(false);

        const handleDeleteClick = (event: React.MouseEvent) => {
            event.preventDefault(); // Prevent the dropdown from closing
            setIsDialogOpen(true); // Open the confirmation dialog
          };

      

    return (
        <div>
            
            <form className="space-y-8" >


             <div className="w-full">
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                    disabled
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
                    disabled
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />


                <InputError className="mt-2" message={errors.email} />
            </div>

            <div className="w-full">
                <InputLabel htmlFor="role" value="Role" />
                <TextInput
                    disabled
                    className="w-full"
                    id="role"
                    type="text"
                    name="role"
                    value={data.role}
                />
                <InputError className="mt-2" message={errors.role} />
            </div>
            

            <div className="flex justify-start gap-4">
                        <ConfirmDeleteUserDialog 
                    children={<Button variant="destructive" type="button" onClick={handleDeleteClick}>
                        <Trash2Icon className="h-4 w-4 mr-2" />
                        Delete
                    </Button>}
                    open={isDialogOpen}
                    onCancel={() => setIsDialogOpen(false)}
                    user={user}          />
                    <form action={route('users.index')}>
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
