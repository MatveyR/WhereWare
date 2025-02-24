import {Router} from "express";
import {productsController} from "../controllers/productsController";

export const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);
productsRouter.post("/", productsController.createProduct);
productsRouter.get("/:id", productsController.getProductById);
productsRouter.put("/:id", productsController.updateProduct);
productsRouter.delete("/:id", productsController.deleteProduct);