import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import NoData from '@/Components/NoData';
import { PageProps, Provider } from '@/types';
import { Product } from '@/types';
import { CreateUserForm } from './Partials/CreateUserForm';

export default function Create() {  
    return (
        <DashboardLayout pageTitle="Create User">

            
            <CreateUserForm />
        </DashboardLayout>
    );
}
