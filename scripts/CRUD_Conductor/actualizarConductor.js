const axios = require('axios');

const endpointUrl = 'http://localhost:3000/conductores';

// Función para actualizar un conductor existente
function updateConductor(idConductor, updatedData) {
  axios.put(`${endpointUrl}/${idConductor}`, updatedData)
    .then(response => {
      console.log('Conductor actualizado:', response.data);
    })
    .catch(error => {
      console.error('Error actualizando conductor:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// updateConductor(1, { nombreConductor: 'NuevoNombre', apellidoConductor: 'NuevoApellido' });

module.exports = updateConductor;
