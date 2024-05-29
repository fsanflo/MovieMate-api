import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { HttpStatus } from "../shared/enums/httpStatus.enum";
import axios from 'axios';

const tmdbApiKey = process.env.TMDB_API_KEY;
const tmdbSearchUrl = `https://api.themoviedb.org/3/search/movie`;
const tmdbMovieUrl = `https://api.themoviedb.org/3/movie`;

const prisma = new PrismaClient();

export class PeliculasController {

    private static async TMDb_buscarPelicula(titulo: string) {
        try {
            // Buscar película por título
            const searchResponse = await axios.get(tmdbSearchUrl, {
                params: {
                    api_key: tmdbApiKey,
                    query: titulo,
                    language: 'es-ES'
                }
            });

            const peliculas = searchResponse.data.results;

            if (peliculas.length === 0) {
                throw new Error('No se encontraron películas en TMDb');
            }
            console.log("-------------------------------");
            console.log(peliculas);
            console.log("-------------------------------");
            return peliculas
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async datosPelicula(req: Request, res: Response) {        
        const peliculaId = req.params.id;
        try {
            const detailsResponse = await axios.get(`${tmdbMovieUrl}/${peliculaId}`, {
                params: {
                    api_key: tmdbApiKey,
                    language: 'es-ES',
                    append_to_response: 'credits'
                }
            });

            const details = detailsResponse.data;

            const mappedPelicula = {
                id: details.id,
                titulo: details.title,
                genero: details.genres.map((genre: any) => genre.name).join(', '),
                reparto: details.credits.cast.slice(0, 5).map((actor: any) => actor.name).join(', '), // Primeros 5 actores
                trama: details.overview,
                duracion: details.runtime,
                director: details.credits.crew.find((member: any) => member.job === 'Director')?.name,
                año: parseInt(details.release_date.split('-')[0]),
                valoraciones: details.vote_average,
            };

            console.log("-------------------------------");
            console.log(mappedPelicula);
            console.log("-------------------------------");
            return mappedPelicula;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async buscarPelicula(req: Request, res: Response) {
        const query = req.query;

        if (typeof query.titulo !== "string") {
            return res.status(HttpStatus.BAD_REQUEST).send({
                message: "Ingresa un titulo valido",
            });
        }

        try {
            const listaPeliculas = await prisma.pelicula.findMany({
                where: {
                    titulo: {
                        contains: query.titulo,
                    },
                },
            });

            const TMDblistaPeliculas = await PeliculasController.TMDb_buscarPelicula(query.titulo);


            if (!TMDblistaPeliculas && !listaPeliculas) {
                return res.status(HttpStatus.BAD_REQUEST).send({
                    message: "No se encontraron peliculas",
                });
            }
            const todasPeliculas = { ...listaPeliculas, ...TMDblistaPeliculas }
            return res.status(HttpStatus.OK).send(todasPeliculas);


            return res.status(HttpStatus.OK).send(listaPeliculas);
        } catch (error) {
            console.error("Error fetching movies:", error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Error fetching movies",
            });
        }
    }

}
