import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import { PageProps, Provider } from '@/types';
import { UpdateProductForm } from './Partials/UpdateProductForm';


export default function Edit({ providers }: { providers: Provider[] }) {  
    return (
    
        <DashboardLayout pageTitle="Update Product">
            
            <UpdateProductForm providers={providers} />
        </DashboardLayout>
    );
}
