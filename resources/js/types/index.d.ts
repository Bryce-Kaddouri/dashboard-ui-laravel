export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export interface Pagination<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface Link {
    url: string;
    label: string;
    active: boolean;
}

export interface Provider {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    updated_at: string;
    products: Product[];
}

export interface Product {
    id: number;
    name: string;
    description: string;
    updated_at: string;
    providers: Provider[];
}
