const axios = require('axios');

const endpointUrl = 'http://localhost:3000/conductores';

// Función para eliminar todos los conductores
function deleteConductores() {
  axios.delete(endpointUrl)
    .then(response => {
      console.log('Todos los conductores eliminados:', response.data);
    })
    .catch(error => {
      console.error('Error eliminando conductores:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// deleteConductores();

module.exports = deleteConductores;
