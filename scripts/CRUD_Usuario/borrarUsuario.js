const axios = require('axios');

const endpointUrl = 'http://localhost:3000/usuarios';

function deleteUser(idUsuario) {
  axios.delete(`${endpointUrl}/${idUsuario}`)
    .then(response => {
      console.log('Usuario eliminado:', response.data);
    })
    .catch(error => {
      console.error('Error eliminando usuario:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// deleteUser(1);

module.exports = deleteUser;
