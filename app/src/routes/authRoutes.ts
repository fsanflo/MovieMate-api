import { Router } from "express";
import { AuthController } from "../auth/authController";
import { handler } from "../shared/middlewares/handler.middleware";
import { validateBody, validateParams } from "../shared/middlewares/validators.midddleware";
import { idSchema, loginSchema, usuarioActualizarSchema, usuarioSchema } from "../shared/validators/common.schema";

export const authRouter = Router();
const authController = AuthController;

authRouter.post("/register",
    validateBody(usuarioSchema),
    handler(authController.registrarUsuario));

authRouter.post("/login",
    validateBody(loginSchema),
    handler(authController.loginUsuario));

// authRouter.put("/delete/:id",
//     validateParams(idSchema),
//     validateBody(loginSchema),
//     handler(authController.loginUsuario));

authRouter.get("",
    handler(authController.listarUsuarios));

authRouter.get("/data/:id",
    validateParams(idSchema),
    handler(authController.datosUsuario));

authRouter.get("/roles",
    handler(authController.obtenerRoles));

authRouter.post("/update/:id",
    validateParams(idSchema),
    validateBody(usuarioActualizarSchema),
    handler(authController.actualizarUsuario));
export default authRouter;



