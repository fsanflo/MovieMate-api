import express from "express"
import peliculasRouter from "./router"

const app = express()
app.use(express.json())

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor alojado en el puerto ${PORT}`)
})


app.use("/api/peliculas", peliculasRouter)
