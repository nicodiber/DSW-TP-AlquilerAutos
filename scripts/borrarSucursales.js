const axios = require('axios');

const apiUrl = 'http://localhost:3000/sucursales';

axios.delete(apiUrl)
  .then(() => {
    console.log('Todas las sucursales han sido borradas');
  })
  .catch(error => {
    console.error('Error borrando sucursales:', error.response?.data || error.message);
  });
