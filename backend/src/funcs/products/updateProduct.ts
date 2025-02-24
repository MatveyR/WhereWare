import {NextFunction, Request, Response} from 'express';
import {Product} from "../../models/Product";

async function updateProduct(req: Request, res: Response, next: NextFunction) {
    const { app: { locals: { mongoClient } } } = req;

    const productId = req.params.id;

    console.log(`Запрос обновления продукта с id ${productId}`);

    const {
        name,
        description,
        category_id,
        quantity,
        price,
        unit,
        image,
    } = req.body;

    if (
        !name &&
        !description &&
        !category_id &&
        quantity === undefined &&
        price === undefined &&
        !unit &&
        !image
    ) {
        res.status(400).json({ message: 'Необходимо передать хотя бы одно поле для обновления' });
        return;
    }

    const productsCollection = mongoClient.db('WhereWare').collection('products');

    try {
        
        const existingProduct = await productsCollection.findOne({ id: productId });
        if (!existingProduct) {
            res.status(404).json({ message: 'Продукт не найден' });
            return;
        }
        
        const updateFields: Partial<Product> = {};
        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (category_id) updateFields.category_id = category_id;
        if (quantity !== undefined) updateFields.quantity = quantity;
        if (price !== undefined) updateFields.price = price;
        if (unit) updateFields.unit = unit;
        if (image !== undefined) updateFields.image = image;

        
        const result = await productsCollection.updateOne(
            { id: productId },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'Продукт не найден' });
            return;
        }

        res.json({ message: 'Продукт успешно обновлен' });
    } catch (error) {
        next(error);
    }
}

export default updateProduct;