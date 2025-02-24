import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Ошибка:', err);

    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
};