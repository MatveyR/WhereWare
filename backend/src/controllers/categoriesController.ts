import getCategories from "../funcs/categories/getCategories";
import getCategoryById from "../funcs/categories/getCategoryById";
import updateCategory from "../funcs/categories/updateCategory";
import deleteCategory from "../funcs/categories/deleteCategory";
import createCategory from "../funcs/categories/createCategory";

export const categoriesController = {
    getCategories: getCategories,
    getCategoryById: getCategoryById,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
    createCategory: createCategory
}