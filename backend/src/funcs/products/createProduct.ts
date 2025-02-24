import {NextFunction, Request, Response} from 'express';
import {Product} from "../../models/Product";

async function createProduct(req: Request, res: Response, next: NextFunction) {
    const {app: {locals: {mongoClient}}} = req;

    console.log(`Запрос создания нового продукта`);

    const {
        name,
        description,
        category_id,
        quantity,
        price,
        unit,
        image,
    } = req.body;

    if (!name || !description || !category_id || !quantity || !price || !unit) {
        res.status(400).json({message: 'Необходимо заполнить все обязательные поля'});
        return;
    }

    const newProduct: Product = {
        id: Date.now().toString(),
        name,
        description,
        category_id,
        quantity,
        price,
        unit,
        image: image || null,
    };

    const productsCollection = mongoClient.db('WhereWare').collection('products');

    try {
        const result = await productsCollection.insertOne(newProduct);

        if (!result.acknowledged) {
            res.status(500).json({message: 'Не удалось создать продукт'});
            return;
        }

        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
}

export default createProduct;