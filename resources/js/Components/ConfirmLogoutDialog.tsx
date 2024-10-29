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

interface ConfirmLogoutDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    children: React.ReactNode;
}

export function ConfirmLogoutDialog({ open, onConfirm, onCancel, children }: ConfirmLogoutDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onCancel} >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="rounded-md">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to logout?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                    
                </DialogHeader>
                <DialogFooter className="flex flex-row justify-center gap-2"> 
                    <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" variant="destructive" onClick={onConfirm}>Confirm</Button>
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
