import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../models/Product.tsx';
import productsData from '../../databases/products.json';
import {removeCategory, updateCategory} from "./categorySlice.tsx";

interface ProductsState {
    products: Product[];
}

const initialState: ProductsState = {
    products: productsData
};

const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        removeProduct(state, action: PayloadAction<string>) {
            state.products = state.products.filter(product => product.id != action.payload)
        },
        addProduct(state, action: PayloadAction<Product>) {
            state.products.push(action.payload)
        },
        updateProduct(state, action: PayloadAction<Product>) {
            const id = state.products.findIndex(product => product.id === action.payload.id);
            if (id !== -1) {
                state.products[id] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateCategory, (state, action) => {
            const updatedCategory = action.payload;
            state.products.forEach((product) => {
                if (product.category_id === updatedCategory.id) {
                    product.category = updatedCategory.name;
                }
            });
        });

        builder.addCase(removeCategory, (state, action) => {
            const deletedCategoryId = action.payload;
            state.products.forEach((product) => {
                if (product.category_id === deletedCategoryId) {
                    product.category = "Любое";
                    product.category_id = "0";
                }
            });
        });
    },
});

export const {removeProduct, addProduct, updateProduct} = productsSlice.actions;
export default productsSlice.reducer;