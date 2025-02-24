import {NextFunction, Request, Response} from "express";

async function getCategoryById(req: Request, res: Response, next: NextFunction) {
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
        next(error);
    }
}

export default getCategoryById;