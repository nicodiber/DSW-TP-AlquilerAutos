// Importamos el módulo Express
const express = require('express');
// Creamos una instancia de la aplicación Express
const app = express();

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Middleware para poder parsear JSON en las solicitudes
app.use(express.json());

// Datos en memoria para simular una "base de datos"
let sucursales = [];

// Ruta para crear una nueva sucursal
app.post('/sucursales', (req, res) => {
  const nuevaSucursal = req.body;
  // Generamos un ID único para la nueva sucursal (podrías utilizar una librería para generar UUIDs)
  nuevaSucursal.id = sucursales.length + 1;
  // Agregamos la nueva sucursal al array de sucursales
  sucursales.push(nuevaSucursal);
  res.status(201).json(nuevaSucursal);
});

// Ruta para obtener todas las sucursales
app.get('/sucursales', (req, res) => {
  res.json(sucursales);
});

// Ruta para obtener una sucursal por su ID
app.get('/sucursales/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sucursal = sucursales.find(sucursal => sucursal.id === id);
  if (!sucursal) {
    res.status(404).json({ error: 'Sucursal no encontrada' });
  } else {
    res.json(sucursal);
  }
});

// Ruta para actualizar una sucursal por su ID
app.put('/sucursales/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = sucursales.findIndex(sucursal => sucursal.id === id);
  if (indice === -1) {
    res.status(404).json({ error: 'Sucursal no encontrada' });
  } else {
    const sucursalActualizada = req.body;
    sucursalActualizada.id = id;
    sucursales[indice] = sucursalActualizada;
    res.json(sucursalActualizada);
  }
});

// Ruta para eliminar una sucursal por su ID
app.delete('/sucursales/:id', (req, res) => {
  const id = parseInt(req.params.id);
  sucursales = sucursales.filter(sucursal => sucursal.id !== id);
  res.sendStatus(204);
});

// Iniciamos el servidor y lo ponemos a escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
