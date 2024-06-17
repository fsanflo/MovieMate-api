import { z } from "zod";

export const idSchema = z.object({
    id: z.preprocess(id => Number(id), z.number().positive()),
});
export const tituloSchema = z.object({
    titulo: z.string().min(1).max(80),
});

export const peliculaSchema = z.object({
    id: z.preprocess(id => Number(id), z.number().positive()),
    portada: z.string().url().max(300).nullable(),
    titulo: z.string().max(80),
    genero: z.string().min(1),
    reparto: z.string(),
    trama: z.string().max(1000),
    duracion: z.number().positive(),
    director: z.string(),
    anho: z.number().positive(),
    valoraciones: z.number().positive(),
    idGeneros: z.number().positive().array().optional(),
});

export const comentarioSchema = z.object({
    usuarioId: z.preprocess(id => Number(id), z.number().positive()),
    peliculaId: z.string(),
    tipo: z.ZodEnum.create(["positivo", "negativo"]),
    texto: z.string().min(10).max(750),
});

export const generoSchema = z.object({
    pelicula1: z.preprocess(id => Number(id), z.number().positive()),
    pelicula2: z.preprocess(id => Number(id), z.number().positive()),
});