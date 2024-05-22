const axios = require('axios');
const readline = require('readline');

const apiUrl = 'http://localhost:3000/sucursales';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID de la sucursal que desea obtener: ', (sucursalId) => {
  axios.get(`${apiUrl}/${sucursalId}`)
    .then(response => {
      console.log(`Sucursal con ID ${sucursalId}:`, response.data);
      rl.close();
    })
    .catch(error => {
      console.error(`Error obteniendo sucursal con ID ${sucursalId}:`, error.response?.data || error.message);
      rl.close();
    });
});