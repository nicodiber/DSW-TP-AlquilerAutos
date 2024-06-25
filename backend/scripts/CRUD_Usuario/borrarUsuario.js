const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/usuarios';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID del Usuario que desea borrar: ', (usuarioId) => {
  axios.delete(`${endpointUrl}/${usuarioId}`)
    .then(() => {
      console.log(`Usuario con ID ${usuarioId} ha sido borrado`);
      rl.close();
    })
    .catch(error => {
      console.error(`Error borrando Usuario con ID ${usuarioId}:`, error.response?.data || error.message);
      rl.close();
    });
});