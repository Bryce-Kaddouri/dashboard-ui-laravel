import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { ProductChartList } from "./Partials/ProductChartList";
import { usePage } from '@inertiajs/react';
import { Product } from "@/types";

export default function Index() {  
    

    return (
        <DashboardLayout pageTitle="Product Chart">
            <ProductChartList /> 
        </DashboardLayout>
    );
}
