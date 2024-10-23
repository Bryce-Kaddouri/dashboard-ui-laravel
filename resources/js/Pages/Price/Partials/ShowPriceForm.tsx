import { Button } from "@/Components/ui/button"
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Trash2Icon } from "lucide-react"
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Price } from "@/types";
import { DatePickerWithPresets } from "@/Components/ui/date-picker";
import { PriceInput } from "@/Components/ui/price-input";
import { ConfirmDeletePriceDialog } from "./ConfirmDeletePriceDialog";
import TextInput from "@/Components/TextInput";

export function ShowPriceForm() {
    const price = usePage().props.price as Price;
    console.log(price);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDeleteClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsDialogOpen(true);
    };

    return (
        <form className="space-y-8" method="post">
            <div>
                <InputLabel htmlFor="price" value="Price" />
                <PriceInput value={Number(price.price)} min={0} name="price" id="price" disabled={true} onChange={() => {}}/>
            </div>

            <div>
                <InputLabel htmlFor="effective_date" value="Effective Date" />
                <DatePickerWithPresets value={price.effective_date} name="effective_date" id="effective_date" disabled={true} onChange={() => {}}/>
            </div>

            <div>
                <InputLabel value="Provider" />
                <TextInput className="w-full" value={price.provider.name} disabled={true} />
            </div>

            <div>
                <InputLabel value="Product" />
                <TextInput className="w-full" value={price.product.name} disabled={true} />
            </div>

            <div className="flex justify-start gap-4">
                <ConfirmDeletePriceDialog 
                    children={<Button variant="destructive" type="button" onClick={handleDeleteClick}>
                        <Trash2Icon className="h-4 w-4 mr-2" />
                        Delete
                    </Button>}
                    open={isDialogOpen}
                    onCancel={() => setIsDialogOpen(false)} price={price}                />
                <form action={route('prices.index')}>
                    <Button variant="outline" type="submit">
                        Back to list
                    </Button>
                </form>
            </div>
        </form>
    )
}
