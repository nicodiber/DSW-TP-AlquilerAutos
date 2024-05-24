const axios = require('axios');

const endpointUrl = 'http://localhost:3000/conductores';

// Función para leer un conductor específico por su ID
function readConductor(idConductor) {
  axios.get(`${endpointUrl}/${idConductor}`)
    .then(response => {
      console.log('Detalles del conductor:', response.data);
    })
    .catch(error => {
      console.error('Error leyendo conductor:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// readConductor(1);

module.exports = readConductor;
