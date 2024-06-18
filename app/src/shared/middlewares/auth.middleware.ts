import { Request, Response, NextFunction } from 'express';
import { RequestUser, Usuario } from "../models/auth.interface"
import jwt from 'jsonwebtoken';
import { HttpStatus } from "../enums/httpStatus.enum";

const SALT = process.env.SALT || 'MovieMateFsanflo';

export const authenticate = (req: RequestUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]; // Separar el token de 'Bearer <token>'

    if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Acceso denegado' });
    }

    try {
        const verified = jwt.verify(token, SALT) as Usuario; 
        req.user = verified;
        next();
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ error: 'Token inválido' });
    }
};
