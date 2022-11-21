import ApiResponseHandler from "../apiResponseHandler"
import taskManager from "../../taskManager";
import { Request, Response, NextFunction } from 'express';

export default async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    try {
        
        const id = Number(req.params.id); 
        await taskManager.restartById(id);
        const payload = taskManager.getTaskInfoById(id);
       
        await ApiResponseHandler.success(req, res, payload);
    } catch(error) {
        await ApiResponseHandler.error(req, res, error);
    }

}