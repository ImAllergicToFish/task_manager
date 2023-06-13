import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../utils/httpError';
import SecurityKeys from '../../taskManager/security';
import ApiResponseHandler from '../apiResponseHandler';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        //Add some auth if you need it
        if(req.path.startsWith('/api')) {
            if(req.headers.authorization != SecurityKeys.authKey) throw new HttpError(401);
        }
        
        return next();
    } catch (error) {
        await ApiResponseHandler.error(req, res, error); 
    }
}
