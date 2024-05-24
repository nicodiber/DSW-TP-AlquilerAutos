const axios = require('axios');

const endpointUrl = 'http://localhost:3000/conductores';

// Función para eliminar un conductor existente por su ID
function deleteConductor(idConductor) {
  axios.delete(`${endpointUrl}/${idConductor}`)
    .then(response => {
      console.log('Conductor eliminado:', response.data);
    })
    .catch(error => {
      console.error('Error eliminando conductor:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// deleteConductor(1);

module.exports = deleteConductor;
