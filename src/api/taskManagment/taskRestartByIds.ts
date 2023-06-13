import ApiResponseHandler from "../apiResponseHandler"
import taskManager from "../../taskManager";
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const ids = (req.query.ids as string[]).map(id => Number(id));
        const payload = await taskManager.restartByIds(ids, req.query);
       
        await ApiResponseHandler.success(req, res, payload);
    } catch(error) {
        await ApiResponseHandler.error(req, res, error);
    }

}