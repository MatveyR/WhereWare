import axios from 'axios';
import {Product} from "../data/models/Product.tsx";

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchProducts = async (
    offset: number,
    limit: number
) => {
    const response = await axios.get(`${API_BASE_URL}/products`, {
        params: {
            limit,
            offset
        },
    });
    return response.data;
};

export const addProduct = async (product: Product) => {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    return response.data;
};

export const updateProduct = async (product: Product) => {
    const response = await axios.put(`${API_BASE_URL}/products/${product.id}`, product);
    return response.data;
};

export const deleteProduct = async (productId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/products/${productId}`);
    return response.data;
};