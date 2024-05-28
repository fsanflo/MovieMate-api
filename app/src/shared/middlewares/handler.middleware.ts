import { Request, Response, NextFunction, RequestHandler } from "express";

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
    const error = new Error("NotFound");
    error["name"] = "NotFound";
    next(error);
};

export const handler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err));
};