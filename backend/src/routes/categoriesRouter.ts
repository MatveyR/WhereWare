import {Router} from "express";
import {categoriesController} from "../controllers/categoriesController";

export const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getCategories);
categoriesRouter.get("/:id", categoriesController.getCategoryById);
categoriesRouter.post("/:id", categoriesController.updateCategory);
categoriesRouter.delete("/:id", categoriesController.deleteCategory);
categoriesRouter.post("/", categoriesController.createCategory);

