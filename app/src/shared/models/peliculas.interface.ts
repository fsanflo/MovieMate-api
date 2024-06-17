export interface Pelicula {
    id: number,
    portada: string,
    titulo: string,
    reparto?: string,
    trama: string,
    duracion: number,
    director: string,
    anho: number,
    valoraciones?: number,
}

export interface Actor {
    id: string,
    nombre: string,
    imagen: string,
}

export interface ActoresPeliculas {
    peliculaId: number,
    actorId: number,
    personaje: string,
}

export interface Genero{
    id: number,
    nombre: string,
}