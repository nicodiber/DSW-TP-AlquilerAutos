const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/tipos';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID del Tipo que desea borrar: ', (tipoId) => {
  axios.delete(`${endpointUrl}/${tipoId}`)
    .then(() => {
      console.log(`Tipo con ID ${tipoId} ha sido borrado`);
      rl.close();
    })
    .catch(error => {
      console.error(`Error borrando Tipo con ID ${tipoId}:`, error.response?.data || error.message);
      rl.close();
    });
});