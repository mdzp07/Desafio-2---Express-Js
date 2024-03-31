const express = require('express')
const app = express()
const fs = require('fs')
// Requerimiento N° 1 del desafio - Levantando el servidor

app.listen(3000, console.log("El servidor está encendido 👍"))
app.use(express.json()) // Para poder manipular el payload

app.get('/canciones', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    res.json(canciones);
})

// Requerimiento N° 2 del desafio - Devolver una página web como respuesta a una consulta GET

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
    })

// Requerimiento N° 3 del desafio - Metodos HTTP de la linea 14 a la 47.    

//Agregar canción

app.post('/canciones', (req, res) => {    
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    canciones.push(cancion)
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    res.send("Canción agregada correctamente")
})

// Editar canción

app.put("/canciones/:id", (req, res) => {
    const {id} = req.params // Requerimiento N° 4 del desafio, manipulando parametros de la URL
    const cancion = req.body // Requerimiento N° 5 del desafio, manipulando el payload de una consulta HTTP 
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = canciones.findIndex(c => c.id == id);
    canciones[index]=cancion;
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    res.send("Canción editada correctamente")
})

// Eliminar canción

app.delete("/canciones/:id", (req,res) => {
    const {id} = req.params // Requerimiento N° 4 del desafio, manipulando parametros de la URL
    canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = canciones.findIndex(c => c.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    res.send("Cancion eliminada correctamente")
})