const axios = require('axios');

const endpointUrl = 'http://localhost:3000/tipos';

axios.get(endpointUrl)
  .then(response => {
    console.log('Todos los Tipos:', response.data);
  })
  .catch(error => {
    console.error('Error obteniendo Tipos:', error.response?.data || error.message);
  });
