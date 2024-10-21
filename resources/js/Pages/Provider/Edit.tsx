import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import { PageProps } from '@/types';
import { UpdateProviderForm } from './Partials/UpdateProviderForm';


export default function Edit() {  
    return (
    
        <DashboardLayout pageTitle="Update Provider">
            
            <UpdateProviderForm />
        </DashboardLayout>
    );
}
