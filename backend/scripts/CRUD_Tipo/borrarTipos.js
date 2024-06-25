const axios = require('axios');

const endpointUrl = 'http://localhost:3000/tipos';

axios.delete(endpointUrl)
  .then(() => {
    console.log('Todos los Tipos han sido borrados');
  })
  .catch(error => {
    console.error('Error borrando Tipos:', error.response?.data || error.message);
  });
