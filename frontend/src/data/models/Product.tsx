export interface Product {
    id: string;
    name: string;
    description?: string;
    quantity: number;
    unit: string;
    image?: string | null;
    price: number;
    category_name: string;
}