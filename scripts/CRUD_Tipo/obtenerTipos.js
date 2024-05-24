const axios = require('axios');

const endpointUrl = 'http://localhost:3000/tipos';

// Función para leer todos los tipos de vehículos
function readTipos() {
  axios.get(endpointUrl)
    .then(response => {
      console.log('Lista de tipos de vehículos:', response.data);
    })
    .catch(error => {
      console.error('Error leyendo tipos de vehículos:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// readTipos();

module.exports = readTipos;
