const axios = require('axios');

const endpointUrl = 'http://localhost:3000/conductores';

axios.delete(endpointUrl)
  .then(() => {
    console.log('Todos los Conductores han sido borrados');
  })
  .catch(error => {
    console.error('Error borrando Conductores:', error.response?.data || error.message);
  });
