import {NextFunction, Request, Response} from "express";

async function deleteCategory(req: Request, res: Response, next: NextFunction) {
    const {app: {locals: {mongoClient}}} = req;

    const categoryId = req.params.id;

    console.log(`Запрос удаления категории с id ${categoryId}`);

    const categoriesCollection = mongoClient.db('WhereWare').collection('categories');
    const productsCollection = mongoClient.db('WhereWare').collection('products');

    try {
        if (categoryId === "0") {
            res.status(400).json({message: 'Удаление нулевой категории запрещено'});
            return;
        }

        const result = await categoriesCollection.deleteOne({id: categoryId});

        await productsCollection.updateMany(
            { category_id: categoryId }, 
            { $set: { category_id: "0" } }
        );

        if (result.deletedCount === 0) {
            res.status(404).json({message: 'Категория не найдена'});
            return;
        }

        res.json({message: 'Категория успешно удалена'});
    } catch (error) {
        next(error);
    }
}

export default deleteCategory;