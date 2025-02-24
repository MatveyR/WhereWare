import { Request, Response } from 'express';
import {Product} from "../../models/Product";

async function updateProduct(req: Request, res: Response) {
    const { app: { locals: { mongoClient } } } = req;

    const productId = req.params.id;
    
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
        if (image) updateFields.image = image;

        
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
        console.error('Ошибка при обновлении продукта:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

export default updateProduct;