import { HttpError as Error } from '../utils/httpError';
import { Request, Response } from 'express';

export default class ApiResponseHandler {
    static async download(req: Request, res: Response, path: string) {
        res.download(path);
    }

    static async success(req: Request, res: Response, payload: unknown) {
        if (payload !== undefined) {
            res.status(200).send(payload);
        } else {
            res.sendStatus(200);
        }
    }

    static async customSuccess(req: Request, res: Response, payload: unknown, code?: number) {
        if (!code) code = 200;
        if (payload !== undefined) {
            res.status(code).send(payload);
        } else {
            res.sendStatus(code);
        }
    }

    /**
     * 204 status code
     */
    static async NoContentSuccess(req: Request, res: Response) {
        this.customSuccess(req, res, undefined, 204);
    }

    static async error(req: Request, res: Response, error: Error | unknown) {
        if (error instanceof Error) {
            res.status(error.code).send(error.message);
        } else {
            console.error(error);
            res.status(500).send(error);
        }
    }
}
