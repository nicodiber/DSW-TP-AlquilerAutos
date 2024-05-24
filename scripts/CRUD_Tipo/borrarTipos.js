const axios = require('axios');

const endpointUrl = 'http://localhost:3000/tipos';

// Función para eliminar todos los tipos de vehículos
function deleteTipos() {
  axios.delete(endpointUrl)
    .then(response => {
      console.log('Todos los tipos de vehículos eliminados:', response.data);
    })
    .catch(error => {
      console.error('Error eliminando tipos de vehículos:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// deleteTipos();

module.exports = deleteTipos;
