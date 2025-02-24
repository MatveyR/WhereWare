import axios from 'axios';
import {Category} from "../data/models/Category.tsx";

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchCategories = async () => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    console.log(response.data);
    return response.data;
};

export const addCategory = async (category: Category) => {
    const catName = category.name;
    const catDesc = category.description;
    console.log(catName + " AAAAAA " + catDesc);
    const response = await axios.post(`${API_BASE_URL}/categories`, {
        name: catName,
        description: catDesc
    });
    return response.data;
};

export const updateCategory = async (category: Category) => {
    const catName = category.name;
    const catDesc = category.description;
    const response = await axios.put(`${API_BASE_URL}/categories/${category.id}`, {
        name: catName,
        description: catDesc
    });
    return response.data;
};

export const deleteCategory = async (categorytId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/categories/${categorytId}`);
    return response.data;
};