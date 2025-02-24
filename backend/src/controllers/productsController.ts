import getProducts from "../funcs/products/getProducts";
import createProduct from "../funcs/products/createProduct";
import getProductById from "../funcs/products/getProductById";
import updateProduct from "../funcs/products/updateProduct";
import deleteProduct from "../funcs/products/deleteProduct";

export const productsController = {
    getProducts: getProducts,
    getProductById: getProductById,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}