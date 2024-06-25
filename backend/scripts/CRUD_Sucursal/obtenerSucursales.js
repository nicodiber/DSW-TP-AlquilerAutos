const axios = require('axios');

const endpointUrl = 'http://localhost:3000/sucursales';

axios.get(endpointUrl)
  .then(response => {
    console.log('Todas las Sucursales:', response.data);
  })
  .catch(error => {
    console.error('Error obteniendo Sucursales:', error.response?.data || error.message);
  });
