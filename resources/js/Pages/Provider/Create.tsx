import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import NoData from '@/Components/NoData';
import { PageProps } from '@/types';
import { ProviderList } from './Partials/ProviderList';
import { Provider, Pagination, Product } from '@/types';
import { CreateProviderForm } from './Partials/CreateProviderForm';


export default function Create() {  
    return (
    
        <DashboardLayout pageTitle="Create Provider">
            
            <CreateProviderForm />
        </DashboardLayout>
    );
}
