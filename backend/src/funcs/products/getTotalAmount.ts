import {NextFunction, Request, Response} from "express";

async function getTotalAmount(req: Request, res: Response, next: NextFunction) {
    const { app: { locals: { mongoClient } } } = req;

    const productsCollection = mongoClient.db('WhereWare').collection('products');

    try {
        res.json({totalAmount: 'productsCollection.stats'});
    } catch (error) {
        next(error);
    }
}

export default getTotalAmount;