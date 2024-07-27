const express = require('express');
const { conectarDB } = require('./config/db'); // Importamos usando destructuring
const cors = require('cors'); // Middleware que permite que el servidor permita solicitudes si el frontend y el backend están en distintos dominios o puertos

// Creamos el servidor
const app = express();

// Conectamos a la BD
conectarDB();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/conductores', require('./routes/conductor'));
app.use('/api/sucursales', require('./routes/sucursal'));
app.use('/api/tipos', require('./routes/tipo'));
app.use('/api/usuarios', require('./routes/usuario'));

app.listen(4000, () => {
    console.log('El servidor está corriendo perfectamente');
});
