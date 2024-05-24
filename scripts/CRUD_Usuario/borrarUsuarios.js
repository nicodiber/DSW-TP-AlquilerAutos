const axios = require('axios');

const endpointUrl = 'http://localhost:3000/usuarios';

function deleteUsers() {
  axios.delete(endpointUrl)
    .then(response => {
      console.log('Todos los usuarios eliminados:', response.data);
    })
    .catch(error => {
      console.error('Error eliminando usuarios:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// deleteUsers();

module.exports = deleteUsers;
