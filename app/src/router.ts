import { Router } from "express";
// import { validateQueryParams } from "@middlewares/validators.midddleware";
import { validateParams, validateQueryParams } from "./shared/middlewares/validators.midddleware";
import { handler } from "./shared/middlewares/handler.middleware";

import { PeliculasController } from "./peliculas/peliculasController";
import { tituloSchema } from "./shared/validators/common.schema";

export const router = Router();
const peliculasController = PeliculasController;


router.get("/buscar",validateQueryParams(tituloSchema), handler(peliculasController.buscarPelicula));
router.get("/buscar",validateParams(tituloSchema), handler(peliculasController.buscarPelicula));





export default router;



