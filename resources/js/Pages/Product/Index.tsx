import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import NoData from '@/Components/NoData';
import { PageProps } from '@/types';
import { Provider, Pagination, Product } from '@/types';
import { ProductList } from './Partials/ProductList';


export default function Index({ pagination }: { pagination: Pagination<Product> }) {  
    return (
    
        <DashboardLayout pageTitle="Products">
            
            <ProductList pagination={pagination} />
        </DashboardLayout>
    );
}
