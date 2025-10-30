import type { NextFunction } from "express";

export default function wrapAsync(fn: (request: Request, response: Response, next: NextFunction) => Promise<unknown>) {
    return (request: Request, response: Response, next: NextFunction) => {
        fn(request, response, next).catch(next);
    };
}