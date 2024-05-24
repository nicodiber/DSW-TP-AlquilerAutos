const axios = require('axios');

const endpointUrl = 'http://localhost:3000/usuarios';

function readUsers() {
  axios.get(endpointUrl)
    .then(response => {
      console.log('Lista de usuarios:', response.data);
    })
    .catch(error => {
      console.error('Error leyendo usuarios:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// readUsers();

module.exports = readUsers;
