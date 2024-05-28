import { Router } from "express";
// import { validateQueryParams } from "@middlewares/validators.midddleware";
import { validateQueryParams } from "./shared/middlewares/validators.midddleware";
import { handler } from "@middlewares/handler.middleware";
import { tituloSchema } from "@shared/validators/common.schema";

import { PeliculasController } from "./peliculas/peliculasController";

export const router = Router();
const peliculasController = PeliculasController;


router.get("/buscar",validateQueryParams(tituloSchema), handler(peliculasController.buscarPelicula));




export default router;



