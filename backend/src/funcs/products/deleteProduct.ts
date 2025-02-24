import { Request, Response } from 'express';

async function deleteProduct(req: Request, res: Response) {
    const { app: { locals: { mongoClient } } } = req;

    const productId = req.params.id;

    console.log(`Запрос удаления продукта с id ${productId}`);

    const productsCollection = mongoClient.db('WhereWare').collection('products');

    try {
        const result = await productsCollection.deleteOne({ id: productId });

        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Продукт не найден' });
            return;
        }

        res.json({ message: 'Продукт успешно удален' });
    } catch (error) {
        console.error('Ошибка при удалении продукта:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

export default deleteProduct;