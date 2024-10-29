import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import NoData from '@/Components/NoData';
import { PageProps, Price } from '@/types';
import { Provider, Pagination, Product } from '@/types';
import { UserList } from './Partials/UserList';


export default function Index() {  
    return (
    
        <DashboardLayout pageTitle="Prices">
            
            <UserList />
        </DashboardLayout>
    );
}
