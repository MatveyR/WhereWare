export type Product = {
    id: string;
    name: string;
    description?: string;
    category_id: string;
    quantity: number;
    price: number;
    unit: string;
    image?: string | null;
}