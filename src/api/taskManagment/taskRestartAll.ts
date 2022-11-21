import ApiResponseHandler from "../apiResponseHandler"
import taskManager from "../../taskManager";
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        await taskManager.restartAll();
        const payload = taskManager.getTaskList(true);
       
        await ApiResponseHandler.success(req, res, payload);
    } catch(error) {
        await ApiResponseHandler.error(req, res, error);
    }

}