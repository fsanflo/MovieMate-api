import express from "express"
import peliculasRouter from "./router"
import cors from 'cors';

const app = express()


app.use(cors({
    origin: 'http://localhost:4200' // Reemplaza con el origen de tu frontend
}));




app.use(express.json())

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Servidor alojado en el puerto ${PORT}`)
})



app.use("/api/peliculas", peliculasRouter)
