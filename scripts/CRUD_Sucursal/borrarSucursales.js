const axios = require('axios');

const endpointUrl = 'http://localhost:3000/sucursales';

axios.delete(endpointUrl)
  .then(() => {
    console.log('Todas las sucursales han sido borradas');
  })
  .catch(error => {
    console.error('Error borrando sucursales:', error.response?.data || error.message);
  });
