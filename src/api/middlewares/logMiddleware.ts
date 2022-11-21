import { Request, Response, NextFunction } from 'express';

export async function logMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        
        console.log(
            `${req.method}` +
                '\n' +
                `${req.path}` +
                '\n' +
                new Date().toISOString() +
                '\n' +
                '--------------------------------',
        );

        return next();
    } catch (error) {
        next(error);
    }
}
