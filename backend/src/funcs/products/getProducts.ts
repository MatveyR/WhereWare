import {Request, Response} from "express";

async function getProducts(req: Request, res: Response) {
    const { app: { locals: { mongoClient } } } = req;

    console.log(`Запрос получения всех продуктов`);

    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const productsCollection = mongoClient.db('WhereWare').collection('products');

    try {
        const products = await productsCollection.aggregate([
            { $skip: offset },
            { $limit: limit },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category_id',
                    foreignField: 'id',
                    as: 'category_details',
                },
            },
            { $unwind: '$category_details' },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    name: 1,
                    description: 1,
                    quantity: 1,
                    price: 1,
                    unit: 1,
                    image: 1,
                    category_name: '$category_details.name',
                },
            },
        ]).toArray();

        if (!products) {
            res.status(400).json({ message: 'Продукты не найдены' });
            return;
        }

        res.json(products);
    } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

export default getProducts;