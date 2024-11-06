const express = require('express');
const { conectarDB } = require('./config/db'); // Importamos usando destructuring
const cors = require('cors'); // Middleware que permite que el servidor permita solicitudes si el frontend y el backend están en distintos dominios o puertos
const path = require('path');

// Creamos el servidor
const app = express();

// Conectamos a la BD
conectarDB();

app.use(cors());
app.use(express.json());

// Hacer la carpeta de uploads accesible
app.use('/uploads', express.static(path.join(__dirname, '../assets/uploads')));


// Rutas
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/sucursales', require('./routes/sucursal'));
app.use('/api/categorias', require('./routes/categoria'));
app.use('/api/marcas', require('./routes/marca'));
app.use('/api/modelos', require('./routes/modelo'));
app.use('/api/autos', require('./routes/auto'));
app.use('/api/alquileres', require('./routes/alquiler'));
app.use('/api/incidentes', require('./routes/incidente'));
app.use('/api/mantenimientos', require('./routes/mantenimiento'));

app.listen(4000, () => {
    console.log('El servidor está corriendo perfectamente');
});
