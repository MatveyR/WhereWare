import {Request, Response} from 'express';

export type Category = {
    id: string;
    name: string;
    description: string;
};

async function createCategory(req: Request, res: Response) {
    const {app: {locals: {mongoClient}}} = req;

    const {name, description} = req.body;

    console.log("Запрос создания новой категории");

    if (!name || !description) {
        res.status(400).json({message: 'Необходимо заполнить все обязательные поля'});
        return;
    }

    const categoriesCollection = mongoClient.db('WhereWare').collection('categories');

    try {
        const newCategory: Category = {
            id: Date.now().toString(),
            name,
            description,
        };

        const result = await categoriesCollection.insertOne(newCategory);

        if (!result.acknowledged) {
            res.status(500).json({message: 'Не удалось создать категорию'});
            return;
        }

        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Ошибка при создании категории:', error);
        res.status(500).json({message: 'Ошибка сервера'});
    }
}

export default createCategory;