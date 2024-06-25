const axios = require('axios');

const endpointUrl = 'http://localhost:3000/conductores';

axios.get(endpointUrl)
  .then(response => {
    console.log('Todas las Conductores:', response.data);
  })
  .catch(error => {
    console.error('Error obteniendo Conductores:', error.response?.data || error.message);
  });
