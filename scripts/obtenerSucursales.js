const axios = require('axios');

const apiUrl = 'http://localhost:3000/sucursales';

axios.get(apiUrl)
  .then(response => {
    console.log('Todas las sucursales:', response.data);
  })
  .catch(error => {
    console.error('Error obteniendo sucursales:', error.response?.data || error.message);
  });
