import express from "express"
import peliculasRoutes from "./routes/peliculaRoutes"
import authRoutes from "./routes/authRoutes"
import cors from 'cors';
import dotenv from 'dotenv';
import { authenticate } from "./shared/middlewares/auth.middleware";


const app = express()

dotenv.config();

app.use(cors({
    origin: 'http://localhost:4200' // Reemplaza con el origen de tu frontend
}));

app.use(express.json())

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Servidor alojado en el puerto ${PORT}`)
})

// app.use("/api/peliculas", authenticate, peliculasRoutes)
app.use("/api/peliculas", peliculasRoutes)
app.use("/api/auth", authRoutes)
