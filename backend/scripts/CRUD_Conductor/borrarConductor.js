const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/conductores';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID del Conductor que desea borrar: ', (conductorId) => {
  axios.delete(`${endpointUrl}/${conductorId}`)
    .then(() => {
      console.log(`Conductor con ID ${conductorId} ha sido borrado`);
      rl.close();
    })
    .catch(error => {
      console.error(`Error borrando Conductor con ID ${conductorId}:`, error.response?.data || error.message);
      rl.close();
    });
});