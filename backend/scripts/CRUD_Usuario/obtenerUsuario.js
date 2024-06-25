const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/usuarios';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID del Usuario que desea obtener: ', (usuarioId) => {
  axios.get(`${endpointUrl}/${usuarioId}`)
    .then(response => {
      console.log(`Usuario con ID ${usuarioId}:`, response.data);
      rl.close();
    })
    .catch(error => {
      console.error(`Error obteniendo Usuario con ID ${usuarioId}:`, error.response?.data || error.message);
      rl.close();
    });
});