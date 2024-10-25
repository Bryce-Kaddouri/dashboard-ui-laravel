import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { ProviderChartList } from "./Partials/ProviderChartList";
import { usePage } from '@inertiajs/react';
import { Provider } from "@/types";

export default function Index() {  
    

    return (
        <DashboardLayout pageTitle="Provider Chart">
            <ProviderChartList /> 
        </DashboardLayout>
    );
}
