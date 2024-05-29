import { z } from "zod";

export const tituloSchema = z.object({
    titulo: z.string().min(1).max(80),
});

export const peliculaSchema = z.object({
    titulo: z.string().min(1).max(80),
    genero: z.string().min(1),
    reparto: z.string().min(1),
    trama: z.string().min(1).max(1000),
    duracion: z.number().positive(),
    director: z.string().min(1),
    año: z.number().positive(),
    valoraciones: z.number().positive(),
});

export const comentarioSchema = z.object({
    usuarioId: z.preprocess(id => Number(id), z.number().positive()),
    peliculaId: z.string(),
    tipo: z.ZodEnum.create(["positivo", "negativo"]),
    texto: z.string().min(10).max(750),
});