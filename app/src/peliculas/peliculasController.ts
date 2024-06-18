import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { HttpStatus } from "../shared/enums/httpStatus.enum";
import axios from 'axios';


const tmdbApiKey = process.env.TMDB_API_KEY;
const tmdbBusquedaUrl = `https://api.themoviedb.org/3/search/movie`;
const tmdbPeliculaUrl = `https://api.themoviedb.org/3/movie`;
const tmdbPortadaUrl = `https://image.tmdb.org/t/p/original`;

const prisma = new PrismaClient();

export class PeliculasController {

    private static async TMDb_buscarPelicula(titulo: string) {
        try {
            // Buscar película por título
            const busqueda = await axios.get(tmdbBusquedaUrl, {
                params: {
                    api_key: tmdbApiKey,
                    query: titulo,
                    language: 'es-ES'

                }
            });

            const TMDb_datosPelicula = busqueda.data.results;

            if (TMDb_datosPelicula.length === 0) {
                throw new Error('No se encontraron películas en TMDb');
            }

            return TMDb_datosPelicula
        } catch (error) {
            console.error(error);
            throw error;
        }
    }



    static async datosPelicula(req: Request, res: Response) {
        const peliculaId = +req.params.id;
        const datos: any = {}
        try {
            const consultaDetalles = await axios.get(`${tmdbPeliculaUrl}/${peliculaId}`, {
                params: {
                    api_key: tmdbApiKey,
                    language: 'es-ES',
                    append_to_response: 'credits'
                }
            });
            console.log(consultaDetalles)
            const detalles = consultaDetalles.data;
            console.log(detalles);
            const peliculaDatos = {
                id: detalles.id,
                titulo: detalles.title,
                trama: detalles.overview,
                duracion: detalles.runtime,
                director: detalles.credits.crew.find((director: any) => director.job === 'Director')?.name ?? "",
                anho: parseInt(detalles.release_date.split('-')[0]),
                valoraciones: detalles.vote_average, //Si no existen valoraciones, vienen a 0
                portada: detalles.poster_path ? `${tmdbPortadaUrl}${detalles.poster_path}` : null,
            };
            console.log(peliculaDatos)

            const pelicula = await prisma.pelicula.findFirst({
                where: {
                    id: peliculaId,
                },
            });

            if (!pelicula) {
                await prisma.pelicula.create({
                    data: peliculaDatos,
                });
                datos.pelicula = peliculaDatos;
            }
            datos.pelicula = peliculaDatos;

            for (const genero of detalles.genres) {
                const generoExiste = await prisma.genero.findFirst({
                    where: {
                        id: genero.id,
                    },
                });
                if (!generoExiste) {
                    const generoDatos = {
                        id: genero.id,
                        nombre: genero.name,
                    };

                    await prisma.genero.create({
                        data: generoDatos,
                    });

                    await prisma.generosPeliculas.create({
                        data: {
                            idGenero: genero.id,
                            idPelicula: peliculaId,
                        },
                    });
                }

                const relacionGeneroPeliculaExiste = await prisma.generosPeliculas.findFirst({
                    where: {
                        idGenero: genero.id,
                        idPelicula: peliculaId
                    },
                });

                if (!relacionGeneroPeliculaExiste) {
                    await prisma.generosPeliculas.create({
                        data: {
                            idGenero: genero.id,
                            idPelicula: peliculaId,
                        },
                    });
                }
            }

            for (const actor of detalles.credits.cast.slice(0, 5)) {
                const actorDatos = {
                    id: actor.id,
                    nombre: actor.name,
                    imagen: actor.profile_path ? `${tmdbPortadaUrl}${actor?.profile_path}` : null,
                };

                const relacionActorPeliculaExiste = await prisma.actoresPeliculas.findFirst({
                    where: {
                        idActor: actor.id,
                        idPelicula: peliculaId,
                    },
                });

                if (!relacionActorPeliculaExiste) {

                    const actorExiste = await prisma.actor.findFirst({
                        where: {
                            id: actor.id,
                        },
                    });
                    if (!actorExiste) {
                        await prisma.actor.create({
                            data: actorDatos,
                        });
                    }
                    await prisma.actoresPeliculas.create({
                        data: {
                            idActor: actor.id,
                            idPelicula: peliculaId,
                            personaje: actor.character,
                        },
                    });


                } else {
                    const actorDB = await prisma.actor.findFirst({
                        where: {
                            id: actor.id,
                        },
                    });

                    if (!actorDB) {
                        const actorDB = await prisma.actor.create({
                            data: actorDatos,
                        });
                    }
                }
            }
            //TODO También hay datos de los actores. Manejar en el futuro que se hace con ellos
            return res.status(HttpStatus.OK).send(datos.pelicula);
        } catch (error: any) {
            console.error(error);
            return res.status(HttpStatus.NOT_FOUND).send({
                message: "No se encontraron datos de la película",
            });
        }
    }

    static async buscarPelicula(req: Request, res: Response) {
        const titulo = req.params.titulo;
        console.log(titulo);
        if (typeof titulo !== "string" || titulo.trim() === "") {
            return res.status(HttpStatus.BAD_REQUEST).send({
                message: "Ingresa un titulo valido",
            });
        }

        try {
            const listaPeliculas = await prisma.pelicula.findMany({
                where: {
                    titulo: {
                        contains: titulo,
                    },
                },
            });


            const TMDblistaPeliculas = await PeliculasController.TMDb_buscarPelicula(titulo);


            if (TMDblistaPeliculas.length === 0 && listaPeliculas.length === 0) {
                return res.status(HttpStatus.NOT_FOUND).send({
                    message: "No se encontraron peliculas",
                });
            }

            const todasPeliculas = [...listaPeliculas];

            for (const pelicula of TMDblistaPeliculas) {
                const datosPelicula = {
                    id: pelicula.id,
                    titulo: pelicula.title,
                    anho: parseInt(pelicula.release_date.split('-')[0]),
                    portada: `${tmdbPortadaUrl}${pelicula.poster_path}`,
                    genero: '',
                    trama: '',
                    duracion: 0,
                    director: '',
                    valoraciones: null,
                };
                todasPeliculas.push(datosPelicula);
            }
            res.status(HttpStatus.OK).send(todasPeliculas);
        } catch (error) {
            console.error("Error fetching movies:", error);
            return res.status(HttpStatus.NOT_FOUND).send({
                message: "No se encontraron películas",
            });
        }
    }

    static async busquedaGenero(req: Request, res: Response) {
        const pelicula1Id = req.body.pelicula1;
        const pelicula2Id = req.body.pelicula2;
        console.log(pelicula1Id);
        console.log(pelicula2Id);

        try {
            const generosPeliculas = await prisma.generosPeliculas.findMany({
                where: {
                    OR: [
                        {
                            idPelicula: pelicula1Id,
                        },
                        {
                            idPelicula: pelicula2Id,
                        },
                    ],
                },
                select: {
                    genero: true,
                },
                distinct: 'idGenero',
            });

            // Array de los generos de ambas peliculas
            const generos = generosPeliculas.map(genero => genero.genero.id);
            const peliculasConGeneros = await prisma.generosPeliculas.findMany({
                where: {
                    idGenero: { in: generos },
                    NOT: {
                        OR: [
                            {
                                idPelicula: pelicula1Id,
                            },
                            {
                                idPelicula: pelicula2Id,
                            },
                        ],
                    }
                },
                select: {
                    pelicula: true,
                    idGenero: true,
                },
                distinct: 'idPelicula',
            });


            const peliculasCountMap = new Map();

            // Contar las apariciones de cada película
            for (const peliculaDATA of peliculasConGeneros) {
                const peliculaId = peliculaDATA.pelicula.id;
                if (peliculasCountMap.has(peliculaId)) {
                    peliculasCountMap.set(peliculaId, peliculasCountMap.get(peliculaId) + 1);
                } else {
                    peliculasCountMap.set(peliculaId, 1);
                }
            }

            // Crear un array de objetos con las películas y su conteo
            const peliculasConConteo = peliculasConGeneros.map(peliculaData => ({
                pelicula: peliculaData.pelicula,
                count: peliculasCountMap.get(peliculaData.pelicula.id),
            }));

            // Ordenar las películas por el número de apariciones en orden descendente
            const sortedPeliculasConConteo = peliculasConConteo.sort((a, b) => b.count - a.count);

            // Usar un Set para eliminar duplicados y mantener solo las películas únicas en el orden correcto
            const peliculasUnicas = new Set();
            const listaPeliculas = [];

            for (const peliculaData of sortedPeliculasConConteo) {
                if (!peliculasUnicas.has(peliculaData.pelicula.id)) {
                    peliculasUnicas.add(peliculaData.pelicula.id);
                    listaPeliculas.push(peliculaData.pelicula);
                }
            }

            return res.status(HttpStatus.OK).send({ listaPeliculas });
        } catch (error) {
            console.error("Error fetching genres:", error);
            return res.status(HttpStatus.NOT_FOUND).send({
                message: "Error al encontrar el género"
            });
        }
    }

    static async obtenerReparto(req: Request, res: Response) {
        const idPelicula = +req.params.id
        const actores = await prisma.actoresPeliculas.findMany({
            select: {
                actor: true,
                personaje: true
            },
            where: {
                idPelicula,
            },
        });
        if (actores) {
            const datosActores = [];
            for (const datos of actores) {
                const { personaje, actor } = datos;
                const { id, nombre, imagen } = actor; // Acceso a las propiedades dentro de actor

                datosActores.push({ id, nombre, imagen, personaje });
            }

            return res.status(HttpStatus.OK).send(datosActores);
        } else {
            return res.status(HttpStatus.NOT_FOUND).send({
                message: 'No se encontraron actores'
            });
        }
    }


    static async obtenerGeneros(req: Request, res: Response) {
        const idPelicula = +req.params.id;
        console.log(idPelicula);

        const generos = await prisma.generosPeliculas.findMany({
            select: {
                genero: true,
            },
            where: {
                idPelicula,
            },
        });

        if (generos.length > 0) {
            // Transformar el resultado a la estructura deseada
            const datosGeneros = generos.map(genero => ({
                id: genero.genero.id,
                nombre: genero.genero.nombre,
            }));

            return res.status(HttpStatus.OK).send(datosGeneros);
        } else {
            return res.status(HttpStatus.NOT_FOUND).send({
                message: 'No se encontraron generos',
            });
        }
    }

}