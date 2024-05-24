const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/sucursales';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID de la sucursal que desea borrar: ', (sucursalId) => {
  axios.delete(`${endpointUrl}/${sucursalId}`)
    .then(() => {
      console.log(`Sucursal con ID ${sucursalId} ha sido borrada`);
      rl.close();
    })
    .catch(error => {
      console.error(`Error borrando sucursal con ID ${sucursalId}:`, error.response?.data || error.message);
      rl.close();
    });
});