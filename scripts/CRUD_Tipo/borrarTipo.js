const axios = require('axios');

const endpointUrl = 'http://localhost:3000/tipos';

// Función para eliminar un tipo de vehículo existente por su ID
function deleteTipo(idTipo) {
  axios.delete(`${endpointUrl}/${idTipo}`)
    .then(response => {
      console.log('Tipo de vehículo eliminado:', response.data);
    })
    .catch(error => {
      console.error('Error eliminando tipo de vehículo:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// deleteTipo(1);

module.exports = deleteTipo;
