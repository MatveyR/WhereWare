import axios from 'axios';
import {Product} from "../data/models/Product.tsx";

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchProducts = async (
    offset: number,
    limit: number,
    textMask: string,
    category: string,
    nonZeroQ: boolean
) => {
    const response = await axios.get(`${API_BASE_URL}/products`, {
        params: {
            limit,
            offset,
            textMask,
            category,
            nonZeroQ
        },
    });
    console.log(response.data);
    return response.data;
};

export const fetchProductById = async (productId: string) => {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    console.log(response.data);
    return response.data;
}

export const addProduct = async (product: Product) => {
    const productName = product.name;
    const productDescription = product.description;
    const productCategory = product.category_name;
    const productQuantity = product.quantity;
    const productPrice = product.price;
    const productUnit = product.unit;
    const productImg = product.image;
    const response = await axios.post(`${API_BASE_URL}/products`, {
        name: productName,
        description: productDescription,
        category_id: productCategory,
        quantity: productQuantity,
        price: productPrice,
        unit: productUnit,
        image: productImg
    });
    return response.data;
};

export const updateProduct = async (product: Product) => {
    const productName = product.name;
    const productDescription = product.description;
    const productCategory = product.category_name;
    const productQuantity = product.quantity;
    const productPrice = product.price;
    const productUnit = product.unit;
    const productImg = product.image;
    const response = await axios.put(`${API_BASE_URL}/products/${product.id}`, {
        name: productName,
        description: productDescription,
        category_id: productCategory,
        quantity: productQuantity,
        price: productPrice,
        unit: productUnit,
        image: productImg
    });
    return response.data;
};

export const deleteProduct = async (productId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/products/${productId}`);
    return response.data;
};