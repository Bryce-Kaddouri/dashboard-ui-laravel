import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import { ShowProductForm } from './Partials/ShowProductForm';


export default function Show() {  
    return (
    
        <DashboardLayout pageTitle="Product Details">
            
            <ShowProductForm />
        </DashboardLayout>
    );
}
