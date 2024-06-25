const axios = require('axios');

const endpointUrl = 'http://localhost:3000/usuarios';

axios.delete(endpointUrl)
  .then(() => {
    console.log('Todos los Usuarios han sido borrados');
  })
  .catch(error => {
    console.error('Error borrando Usuarios:', error.response?.data || error.message);
  });
