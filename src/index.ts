import express from "express"

const app = express()
app.use(express.json)

const PORT = 3000

app.get("/peliculas", (_req, res) => {
res.send("SISI")
})

app.listen(PORT, () => {
    console.log(`Server in port ${PORT}`)
})