const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());

let mascotas = [
    {
        "id": 1,
        "nombre": "Firulais",
        "especie": "Perro",
        "edad": 3,
        "adoptado": false
    }
];

app.get('/mascotas', (req, res) => {
    res.json(mascotas);
});

app.get('/mascotas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const mascota = mascotas.find(m => m.id === id);
    
    if (mascota) {
        res.json(mascota);
    } else {
        res.status(404).json({ mensaje: "Mascota no encontrada" });
    }
});

app.post('/mascotas', (req, res) => {
    const nuevaMascota = req.body;
    
    nuevaMascota.id = mascotas.length > 0 ? mascotas[mascotas.length - 1].id + 1 : 1;
    
    mascotas.push(nuevaMascota);
    res.status(201).json(nuevaMascota);
});

app.put('/mascotas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = mascotas.findIndex(m => m.id === id);

    if (index !== -1) {
        
        mascotas[index] = { ...mascotas[index], ...req.body, id: id };
        res.json(mascotas[index]);
    } else {
        res.status(404).json({ mensaje: "Mascota no encontrada" });
    }
});

app.delete('/mascotas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = mascotas.findIndex(m => m.id === id);

    if (index !== -1) {
        const mascotaEliminada = mascotas.splice(index, 1);
        res.json({ mensaje: "Mascota eliminada con éxito", mascota: mascotaEliminada[0] });
    } else {
        res.status(404).json({ mensaje: "Mascota no encontrada" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de adopción corriendo en http://localhost:${PORT}`);
});