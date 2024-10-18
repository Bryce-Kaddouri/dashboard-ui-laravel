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
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to logout?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                    
                </DialogHeader>
                <DialogFooter> 
                    <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                    <form method="POST" action={route('logout')}>
                        <Button type="submit" variant="destructive">Confirm</Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
