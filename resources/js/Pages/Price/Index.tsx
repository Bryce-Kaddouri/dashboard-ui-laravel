import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import NoData from '@/Components/NoData';
import { PageProps, Price } from '@/types';
import { Provider, Pagination, Product } from '@/types';
import { PriceList } from './Partials/PriceList';


export default function Index({ prices }: { prices: Pagination<Price> }) {  
    return (
    
        <DashboardLayout pageTitle="Prices">
            
            <PriceList prices={prices} />
        </DashboardLayout>
    );
}
