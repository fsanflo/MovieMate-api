import { z } from "zod";

export const tituloSchema = z.object({
    titulo: z.string().min(1).max(80),
});

export const comentarioSchema = z.object({
    usuarioId: z.preprocess(id => Number(id), z.number().positive()),
    peliculaId: z.string(),
    tipo: z.ZodEnum.create(["positivo", "negativo"]),
    texto: z.string().min(10).max(750),
});