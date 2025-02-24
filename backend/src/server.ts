import express from "express";
import cors from "cors";
import {initMongo} from "./utils/mongo/connection";
import {productsRouter} from "./routes/productsRouter";
import {categoriesRouter} from "./routes/categoriesRouter";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

initMongo()
    .then((client) => {
        app.locals.mongoClient = client;
        return app.listen(port, () => {
            console.log(`Сервер запущен на http://localhost:${port}`);
        })
    })
    .catch((err) => {
        console.error('Ошибка подключения к базе данных: ', err);
        process.exit(1);
    })

process.on('SIGINT', async () => {
    const {mongoClient} = app.locals;
    await mongoClient.close();
    console.log('Соединение с базой данных закрыто');
    process.exit(0);
});

