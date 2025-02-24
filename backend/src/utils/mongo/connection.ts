import {MongoClient} from "mongodb";
import * as fs from "node:fs";
import path from "node:path";

const mongoURI = "mongodb://localhost:27017/";

export const initMongo = async () => {
    const client = new MongoClient(mongoURI);
    await client.connect();

    console.log('Подключено к базе данных');

    const db = client.db('WhereWare');

    const productDataPath = path.join(__dirname, '/data_source/products.json');
    const productData = JSON.parse(fs.readFileSync(productDataPath, 'utf-8'));

    const categoryDataPath = path.join(__dirname, '/data_source/categories.json');
    const categoryData = JSON.parse(fs.readFileSync(categoryDataPath, 'utf-8'));

    await db.collection('categories').deleteMany({});
    await db.collection('products').deleteMany({});

    await db.collection('categories').insertMany(categoryData);
    console.log(`Добавлено ${categoryData.length} категорий`);

    await db.collection('products').insertMany(productData);
    console.log(`Добавлено ${productData.length} товаров`);

    return client;
}
