import ApiResponseHandler from "../apiResponseHandler"
import taskManager from "../../taskManager";
import { Request, Response, NextFunction } from 'express';
import { TaskManagerTask } from "../../ts/types";

export default async (
    req: Request<never, unknown, unknown, {isReturnEnv: 'true' | 'false'}>, 
    res: Response<TaskManagerTask[]>, 
    next: NextFunction
) => {
    try {
        
        const isReturnEnv: boolean = (req.query.isReturnEnv == 'true');
        const payload = taskManager.getTaskList(isReturnEnv);
       
        await ApiResponseHandler.success(req, res, payload);
    } catch(error) {
        await ApiResponseHandler.error(req, res, error);
    }

}