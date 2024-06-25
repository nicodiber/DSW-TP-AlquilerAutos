const axios = require('axios');

const endpointUrl = 'http://localhost:3000/sucursales';

axios.delete(endpointUrl)
  .then(() => {
    console.log('Todas las Sucursales han sido borradas');
  })
  .catch(error => {
    console.error('Error borrando Sucursales:', error.response?.data || error.message);
  });
