import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import { ShowProviderForm } from './Partials/ShowProviderForm';


export default function Show() {  
    return (
    
        <DashboardLayout pageTitle="Update Provider">
            
            <ShowProviderForm />
        </DashboardLayout>
    );
}
