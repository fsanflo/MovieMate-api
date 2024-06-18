import { Request } from "express";
export interface Usuario {
    userId: number;
    rol: number;
}

export interface RequestUser extends Request {
    user?: Usuario;
  }