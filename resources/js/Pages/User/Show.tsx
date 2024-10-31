import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';

import { ShowUserForm } from './Partials/ShowUserForm';

export default function Show() {  
    return (
        <DashboardLayout pageTitle="User Details">

            
            <ShowUserForm />
        </DashboardLayout>
    );
}
