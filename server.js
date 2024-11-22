const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.static(__dirname));
app.use(express.json());

function obtenerFechaFormato() {
    const ahora = new Date();
    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const anio = ahora.getFullYear();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    
    return `${dia}-${mes}-${anio} ${horas}-${minutos}-${segundos}`;
}

app.post('/archivo', (req, res) => {
    const { numero } = req.body;
    if (numero === undefined) {
        console.error("Número no proporcionado en la solicitud.");
        return res.status(400).json({ message: 'Número no proporcionado en la solicitud.' });
    }

    const nombreArchivo = `${obtenerFechaFormato()}.txt`;
    const rutaArchivo = path.join(__dirname, 'archivo/', nombreArchivo);

    const carpeta = path.join(__dirname, 'archivo');
    if (!fs.existsSync(carpeta)) {
        fs.mkdirSync(carpeta, { recursive: true });
    }

    fs.writeFile(rutaArchivo, `Número alcanzado: ${numero}\n`, (err) => {
        if (err) {
            console.error('Error al guardar el número en el servidor:', err);
            return res.status(500).json({ message: 'Error al guardar el número en el servidor.' });
        }
        console.log(`Número guardado con éxito en el archivo: ${rutaArchivo}`);
        res.json({ message: 'Número guardado con éxito.' });
    });
});


const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
