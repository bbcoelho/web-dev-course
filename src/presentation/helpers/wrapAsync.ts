import type { Request, Response, NextFunction, RequestHandler } from 'express';

export function wrapAsync(fn: (request: Request, response: Response, next: NextFunction) => Promise<unknown>): RequestHandler {
    return (request: Request, response: Response, next: NextFunction) => {
        Promise.resolve(fn(request, response, next)).catch(next);
    };
}