/**
 * Custom error for ApiResponseHandler;
 */
 export class HttpError extends Error {
    code: number;
    
    /**
     * 
     * @param code - some of HTTP error code;
     * @param message - information about error;
     */
    constructor(code?: number, message?: string) {
        super(message);
        this.message = message ? message : 'UNKNOWN ERROR';

        if(!code) code = 500;
        if(!message && code == 401) message = 'Unauthorized';
        if(!message && code == 403) message = 'Invalid input data';
        if(!message && code == 404) message = 'Not found';
        if(!message && code == 520) message = 'Unknown error';
        if(!message && code == 500) message = 'Server side error';

        this.code = code;
    }
}
