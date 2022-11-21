import { Request, Response, NextFunction } from 'express';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        //Add some auth if you need it

        return next();
    } catch (error) {
        next(error);
    }
}
