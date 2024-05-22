const express = require('express');
const sucursalRoutes = require('./routes/sucursalRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/sucursales', sucursalRoutes);

app.get('/', (req, res) => {
  res.send('Proyecto Desarrollo de Software - TP-AlquilerAuto - Primer entrega');
});

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});