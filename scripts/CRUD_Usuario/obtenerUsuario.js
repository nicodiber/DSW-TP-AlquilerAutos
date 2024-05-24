const axios = require('axios');

const endpointUrl = 'http://localhost:3000/usuarios';

function readUser(idUsuario) {
  axios.get(`${endpointUrl}/${idUsuario}`)
    .then(response => {
      console.log('Detalles del usuario:', response.data);
    })
    .catch(error => {
      console.error('Error leyendo usuario:', error.response?.data || error.message);
    });
}

// Ejemplo de cómo llamar a la función
// readUser(1);

module.exports = readUser;
