import {Request, Response} from "express";

async function deleteCategory(req: Request, res: Response) {
    const {app: {locals: {mongoClient}}} = req;

    const categoryId = req.params.id;

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
        console.error('Ошибка при удалении категории:', error);
        res.status(500).json({message: 'Ошибка сервера'});
    }
}

export default deleteCategory;