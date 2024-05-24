const axios = require('axios');

const endpointUrl = 'http://localhost:3000/usuarios';

function updateUser(idUsuario, updatedData) {
  axios.put(`${endpointUrl}/${idUsuario}`, updatedData)
    .then(response => {
      console.log('Usuario actualizado:', response.data);
    })
    .catch(error => {
      console.error('Error actualizando usuario:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// updateUser(1, { nombre: 'NuevoNombre', apellido: 'NuevoApellido' });

module.exports = updateUser;
