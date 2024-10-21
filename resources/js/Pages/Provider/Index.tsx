import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {DashboardLayout} from '@/Layouts/DashboardLayout';
import NoData from '@/Components/NoData';
import { PageProps } from '@/types';
import { ProviderList } from './Partials/ProviderList';
import { Provider, Pagination, Product } from '@/types';

interface Props extends PageProps {
    pagination: Pagination<Provider>;
    query: string;
}


export default function Index({ pagination, query }: Props) {  
    console.log(pagination);
    return (
    
        <DashboardLayout pageTitle="Providers">
            
            {pagination.data.length === 0 ? (
                <NoData 
                    title="No Providers" 
                    description="You can start selling as soon as you add a product." 
                    buttonText="Add Provider" 
                    onClick={() => window.location.href = route('providers.create')} 
                />
            ) : (
                
                <ProviderList pagination={pagination} />
                
                
            )}
        </DashboardLayout>
    );
}
