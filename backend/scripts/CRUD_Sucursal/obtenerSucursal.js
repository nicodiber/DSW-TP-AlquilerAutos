const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/sucursales';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID de la Sucursal que desea obtener: ', (sucursalId) => {
  axios.get(`${endpointUrl}/${sucursalId}`)
    .then(response => {
      console.log(`Sucursal con ID ${sucursalId}:`, response.data);
      rl.close();
    })
    .catch(error => {
      console.error(`Error obteniendo Sucursal con ID ${sucursalId}:`, error.response?.data || error.message);
      rl.close();
    });
});