import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { ShowPriceForm } from "./Partials/ShowPriceForm";

export default function Show() {  
    return (
    
        <DashboardLayout pageTitle="Price Details">
            
            <ShowPriceForm />
        </DashboardLayout>
    );
}