const axios = require('axios');

const endpointUrl = 'http://localhost:3000/conductores';

// Función para leer todos los conductores
function readConductores() {
  axios.get(endpointUrl)
    .then(response => {
      console.log('Lista de conductores:', response.data);
    })
    .catch(error => {
      console.error('Error leyendo conductores:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// readConductores();

module.exports = readConductores;
