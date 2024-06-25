const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/tipos';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID del Tipo que desea obtener: ', (tipoId) => {
  axios.get(`${endpointUrl}/${tipoId}`)
    .then(response => {
      console.log(`Tipo con ID ${tipoId}:`, response.data);
      rl.close();
    })
    .catch(error => {
      console.error(`Error obteniendo Tipo con ID ${tipoId}:`, error.response?.data || error.message);
      rl.close();
    });
});