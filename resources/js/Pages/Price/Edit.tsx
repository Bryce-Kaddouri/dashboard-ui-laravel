import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import { PageProps, Provider } from '@/types';
import { UpdatePriceForm } from './Partials/UpdatePriceForm';


export default function Edit({ providers }: { providers: Provider[] }) {  
    return (
    
        <DashboardLayout pageTitle="Update Price">
            
            <UpdatePriceForm providers={providers} />
        </DashboardLayout>
    );
}
