export interface Product {
    id: string;
    name: string;
    description?: string;
    category: string;
    category_id: string;
    quantity: number;
    price: number;
    unit: string;
    image?: string | null;
}