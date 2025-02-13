import {configureStore, Tuple} from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice.tsx';
import categoriesReducer from './slices/categorySlice.tsx';
import userReducer from './slices/userSlice.tsx';
import logger from 'redux-logger';

const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        users: userReducer
    },
    middleware: () => new Tuple(logger)
});

export type RootState = ReturnType<typeof store.getState>;

export default store;