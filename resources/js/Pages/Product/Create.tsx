import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import NoData from '@/Components/NoData';
import { PageProps, Provider } from '@/types';
import { Product } from '@/types';
import { CreateProductForm } from './Partials/CreateProductForm';


export default function Create({ providers }: { providers: Provider[] }) {  
    return (
        <DashboardLayout pageTitle="Create Product">

            
            <CreateProductForm providers={providers} />
        </DashboardLayout>
    );
}
