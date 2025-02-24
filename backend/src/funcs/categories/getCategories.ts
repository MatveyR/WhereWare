import {Request, Response} from "express";

async function getCategories(req: Request, res: Response) {
    const {app: {locals: {mongoClient}}} = req;

    const categoriesCollection = mongoClient.db('WhereWare').collection('categories');

    console.log("Запрос получения всех категорий");

    try {
        const categories = await categoriesCollection.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'id',
                    foreignField: 'category_id',
                    as: 'products',
                },
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    name: 1,
                    description: 1,
                    productCount: {$size: '$products'},
                },
            },
        ]).toArray();

        res.json(categories);
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
        res.status(500).json({message: 'Ошибка сервера'});
    }
}

export default getCategories;