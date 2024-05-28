import { AnyZodObject } from "zod";

import { NextFunction, Response, Request } from "express";
import { HttpStatus } from "../enums/httpStatus.enum";

const enum SchemaTargets {
    body = "body",
    params = "params",
    query = "query",
}

export const validateReqSchema = async (schema: AnyZodObject, data: object, req: Request, res: Response, next: NextFunction, target?: SchemaTargets) => {
    const validation = await schema.safeParseAsync(data);

    if (validation.success === false) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(validation.error.flatten());
    }

    req[target ?? SchemaTargets.body] = validation.data;
    next();
};

export const validateBody = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => await validateReqSchema(schema, req.body, req, res, next);
};

export const validateParams = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => await validateReqSchema(schema, req.params, req, res, next, SchemaTargets.params);
};

export const validateQueryParams = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => await validateReqSchema(schema, req.query, req, res, next, SchemaTargets.query);
};