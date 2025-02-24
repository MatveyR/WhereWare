import {Request, Response} from "express";

async function getCategoryById(req: Request, res: Response) {
    const {app: {locals: {mongoClient}}} = req;

    const categoryId = req.params.id;

    console.log(`Запрос получения категории с id ${categoryId}`);

    const categoriesCollection = mongoClient.db('WhereWare').collection('categories');

    try {
        const category = await categoriesCollection.aggregate([
            {$match: {id: categoryId}},
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

        if (!category) {
            res.status(404).json({message: 'Категория не найдена'});
            return;
        }

        res.json(category);
    } catch (error) {
        console.error('Ошибка при получении категории:', error);
        res.status(500).json({message: 'Ошибка сервера'});
    }
}

export default getCategoryById;