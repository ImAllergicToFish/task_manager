import ApiResponseHandler from "../apiResponseHandler"
import taskManager from "../../taskManager";
import { Request, Response, NextFunction } from 'express';

export default async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    try {
        
        const id = Number(req.params.id); 
        const payload = await taskManager.startById(id, req.query);
       
        await ApiResponseHandler.success(req, res, payload);
    } catch(error) {
        await ApiResponseHandler.error(req, res, error);
    }

}