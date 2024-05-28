import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { HttpStatus } from "@enums/httpStatus.enum";
import axios from 'axios';

const apiKey = process.env.API_KEY;
const apiUrl = `http://www.omdbapi.com/?apikey='${apiKey}`
const prisma = new PrismaClient();
export class PeliculasController {

    private async OMDB_buscarPelicula(titulo: string) {
        const axios = require('axios');

        const options = {
            method: 'GET',
            url: 'http://www.omdbapi.com/',
            params: {
                s: titulo
            },
            headers: {
                'x-rapidapi-key': '69ad5e9d1emsh0c2ec3a52771fd9p185a22jsn558e6fce54bd',
                'x-rapidapi-host': 'omdb-api4.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    static async buscarPelicula(req: Request, res: Response) {
        console.log(apiKey);

        const query = req.query
        console.log(query.titulo);
        let listaPeliculas = await prisma.pelicula.findMany({
            where: {
                // titulo: { contains: query.titulo }
            }
        })

        if (!listaPeliculas) {
            listaPeliculas = await axios.get(apiUrl + '?t=' + query.titulo)
        } else {
            return res.status(HttpStatus.OK).send(listaPeliculas);
        }
        res.status(HttpStatus.BAD_REQUEST).send({
            message: "No se encontraron peliculas",
        });

    }
}
