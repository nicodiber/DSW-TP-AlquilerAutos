const axios = require('axios');

const endpointUrl = 'http://localhost:3000/tipos';

// Función para actualizar un tipo de vehículo existente
function updateTipo(idTipo, updatedData) {
  axios.put(`${endpointUrl}/${idTipo}`, updatedData)
    .then(response => {
      console.log('Tipo de vehículo actualizado:', response.data);
    })
    .catch(error => {
      console.error('Error actualizando tipo de vehículo:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// updateTipo(1, { tipoVehiculo: 'NuevoTipo', precioTipo: 1500 });

module.exports = updateTipo;
