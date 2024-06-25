const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/conductores';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID del Conductor que desea obtener: ', (conductorId) => {
  axios.get(`${endpointUrl}/${conductorId}`)
    .then(response => {
      console.log(`Conductor con ID ${conductorId}:`, response.data);
      rl.close();
    })
    .catch(error => {
      console.error(`Error obteniendo Conductor con ID ${conductorId}:`, error.response?.data || error.message);
      rl.close();
    });
});