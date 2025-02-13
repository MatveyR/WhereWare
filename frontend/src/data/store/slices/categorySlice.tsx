import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category} from "../../models/Category.tsx";
import categoriesData from '../../databases/categories.json';

interface CategoriesState {
    categories: Category[];
}

const initialState: CategoriesState = {
    categories: categoriesData
};


const categorySlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        removeCategory(state, action: PayloadAction<string>) {
            state.categories = state.categories.filter((category) => category.id != action.payload)
        },
        addCategory(state, action: PayloadAction<Category>) {
            state.categories.push(action.payload)
        },
        updateCategory(state, action: PayloadAction<Category>) {
            const id = state.categories.findIndex(category => category.id === action.payload.id);
            if (id !== -1) {
                state.categories[id] = action.payload;
            }
        },
    },
});

export const {removeCategory, addCategory, updateCategory} = categorySlice.actions;


export default categorySlice.reducer;