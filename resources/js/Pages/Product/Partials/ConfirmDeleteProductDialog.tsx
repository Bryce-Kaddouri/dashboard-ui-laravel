import {
    Dialog,
    DialogFooter,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Button } from "@/Components/ui/button"
import { Product, Provider } from "@/types";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";

interface ConfirmLogoutDialogProps {
    open: boolean;
    onCancel: () => void;
    children: React.ReactNode;
    product: Product;
}

export function ConfirmDeleteProductDialog({ open, onCancel, children, product }: ConfirmLogoutDialogProps) {

    const { data, setData, delete: deleteForm, errors, processing, recentlySuccessful } =
        useForm({
           id: product.id
        });

    const deleteSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        if (data.id !== -1) {
          deleteForm(route('products.destroy', data.id));
        }
        onCancel();

       
    };
    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center justify-center p-4">
                        <Trash2Icon className="h-20 w-20 text-red-500" />
                    </div>
                    <DialogTitle className="text-center pb-4">Are you sure you want to delete this provider?</DialogTitle>
                    <DialogDescription className="text-center pb-4">
                        This action cannot be undone and all the data associated with this provider will be deleted.
                    </DialogDescription>
                    
                </DialogHeader>
                <DialogFooter> 
                    <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                    
                        <Button type="submit" variant="destructive" onClick={deleteSubmit}>Confirm</Button>
                   
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
