const axios = require('axios');

const endpointUrl = 'http://localhost:3000/tipos';

// Función para leer un tipo de vehículo específico por su ID
function readTipo(idTipo) {
  axios.get(`${endpointUrl}/${idTipo}`)
    .then(response => {
      console.log('Detalles del tipo de vehículo:', response.data);
    })
    .catch(error => {
      console.error('Error leyendo tipo de vehículo:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// readTipo(1);

module.exports = readTipo;
