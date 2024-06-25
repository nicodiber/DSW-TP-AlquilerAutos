const express = require('express');
const sucursalRoutes = require('./routes/sucursalRoutes');
const conductorRoutes = require('./routes/conductorRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const tipoRoutes = require('./routes/tipoRoutes');
const { connectDB } = require('./database');

const app = express();
const PORT = 3000;

async function startServer() {
  try {
    await connectDB();
    console.log('Conexión exitosa a MongoDB.');

    app.use(express.json());
    app.use('/sucursales', sucursalRoutes);
    app.use('/conductores', conductorRoutes);
    app.use('/usuarios', usuarioRoutes);
    app.use('/tipos', tipoRoutes);

    app.get('/', (req, res) => {
      res.send('Proyecto Desarrollo de Software - TP-AlquilerAuto - Segunda entrega');
    });

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log('Ahora sí, podés en una nueva terminar ejecutar los distintos scripts para probar el CRUD de los distintos objetos!');
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Salir de la aplicación si hay un error de conexión
  }
}

startServer();
