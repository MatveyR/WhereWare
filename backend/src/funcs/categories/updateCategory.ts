import {Request, Response} from "express";
import {Category} from "./createCategory";

async function updateCategory(req: Request, res: Response) {
    const {app: {locals: {mongoClient}}} = req;

    const categoryId = req.params.id;

    const {name, description} = req.body;

    if (!name && !description) {
        res.status(400).json({message: 'Необходимо передать хотя бы одно поле для обновления'});
        return;
    }

    const categoriesCollection = mongoClient.db('WhereWare').collection('categories');

    try {

        const existingCategory = await categoriesCollection.findOne({id: categoryId});
        if (!existingCategory) {
            res.status(404).json({message: 'Категория не найдена'});
            return;
        }

        const updateFields: Partial<Category> = {};
        if (name) updateFields.name = name;
        if (description) updateFields.description = description;

        const result = await categoriesCollection.updateOne(
            {id: categoryId},
            {$set: updateFields}
        );

        if (result.matchedCount === 0) {
            res.status(404).json({message: 'Категория не найдена'});
            return;
        }

        res.json({message: 'Категория успешно обновлена'});
    } catch (error) {
        console.error('Ошибка при обновлении категории:', error);
        res.status(500).json({message: 'Ошибка сервера'});
    }
}

export default updateCategory;