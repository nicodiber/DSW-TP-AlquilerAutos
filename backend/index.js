const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// Creamos el servidor
const app = express();

// Conectamos a la BD
conectarDB();
app.use(cors());
app.use(express.json());

//ahi donde dice api, lo ponemos en el postman
app.use('/api/conductores', require('./routes/conductor'));

app.listen(4000, () => {
    console.log('El servidor esta corriendo perfectamente')
})