import {NextFunction, Request, Response} from "express";

async function getProductById(req: Request, res: Response, next: NextFunction) {
    const {app: {locals: {mongoClient}}} = req;

    const productId = req.params.id;

    console.log(`Запрос получения продукта с id ${productId}`);

    const productsCollection = mongoClient.db('WhereWare').collection('products');

    try {
        const product = await productsCollection.aggregate([
            { $match: {id: productId} },
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

        if (!product) {
            res.status(404).json({message: 'Продукт не найден'});
            return;
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
}

export default getProductById;