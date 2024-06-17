import { Router } from "express";
import { validateBody, validateParams, validateQueryParams } from "./shared/middlewares/validators.midddleware";
import { handler } from "./shared/middlewares/handler.middleware";

import { PeliculasController } from "./peliculas/peliculasController";
import { generoSchema, idSchema, tituloSchema } from "./shared/validators/common.schema";

export const router = Router();
const peliculasController = PeliculasController;

router.get("/buscar/:titulo",
    validateParams(tituloSchema),
    handler(peliculasController.buscarPelicula));

router.get("/datos/:id",
    validateParams(idSchema),
    handler(peliculasController.datosPelicula));

router.post("/list",
    validateBody(generoSchema),
    handler(peliculasController.busquedaGenero));

router.get("/reparto/:id",
    validateParams(idSchema),
    handler(peliculasController.obtenerReparto));

router.get("/generos/:id",
    validateParams(idSchema),
    handler(peliculasController.obtenerGeneros));

export default router;



