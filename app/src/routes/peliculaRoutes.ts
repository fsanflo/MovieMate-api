import { Router } from "express";
import { PeliculasController } from "../peliculas/peliculasController";
import { handler } from "../shared/middlewares/handler.middleware";
import { validateBody, validateParams } from "../shared/middlewares/validators.midddleware";
import { generoSchema, idSchema, tituloSchema } from "../shared/validators/common.schema";


export const peliculaRouter = Router();
const peliculasController = PeliculasController;

peliculaRouter.get("/buscar/:titulo",
    validateParams(tituloSchema),
    handler(peliculasController.buscarPelicula));

peliculaRouter.get("/datos/:id",
    validateParams(idSchema),
    handler(peliculasController.datosPelicula));

peliculaRouter.post("/list",
    validateBody(generoSchema),
    handler(peliculasController.busquedaGenero));

peliculaRouter.get("/reparto/:id",
    validateParams(idSchema),
    handler(peliculasController.obtenerReparto));

peliculaRouter.get("/generos/:id",
    validateParams(idSchema),
    handler(peliculasController.obtenerGeneros));

export default peliculaRouter;



