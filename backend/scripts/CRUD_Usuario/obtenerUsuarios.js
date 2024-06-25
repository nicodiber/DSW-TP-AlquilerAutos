const axios = require('axios');

const endpointUrl = 'http://localhost:3000/usuarios';

axios.get(endpointUrl)
  .then(response => {
    console.log('Todos los Usuarios:', response.data);
  })
  .catch(error => {
    console.error('Error obteniendo Usuarios:', error.response?.data || error.message);
  });
