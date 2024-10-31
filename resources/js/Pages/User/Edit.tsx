import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import NoData from '@/Components/NoData';
import { PageProps, Provider } from '@/types';
import { Product } from '@/types';
import { EditUserForm } from './Partials/EditUserForm';

export default function Edit() {  
    return (
        <DashboardLayout pageTitle="Edit User">

            
            <EditUserForm />
        </DashboardLayout>
    );
}
