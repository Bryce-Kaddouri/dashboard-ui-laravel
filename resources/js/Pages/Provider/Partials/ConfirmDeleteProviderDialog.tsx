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
import { Provider } from "@/types";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import { FormEventHandler } from "react";

interface ConfirmLogoutDialogProps {
    open: boolean;
    onConfirm: FormEventHandler;
    onCancel: () => void;
    children: React.ReactNode;
    provider: Provider;
}

export function ConfirmDeleteProviderDialog({ open, onConfirm, onCancel, children, provider }: ConfirmLogoutDialogProps) {
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
                    
                        <Button type="submit" variant="destructive" onClick={onConfirm}>Confirm</Button>
                   
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
