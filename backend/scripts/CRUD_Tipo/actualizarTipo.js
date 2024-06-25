const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/tipos';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID del Tipo de vehículo que desea actualizar: ', (idTipo) => {
  const url = `${endpointUrl}/${idTipo}`;

  // Verificar si el tipo de vehículo con el ID proporcionado existe
  axios.get(url)
    .then(() => {
      rl.question('Ingrese el nuevo tipo de vehículo: ', (tipoVehiculo) => {
        rl.question('Ingrese el nuevo precio del tipo de vehículo: ', (precioTipo) => {
          const tipoData = {
            tipoVehiculo,
            precioTipo
          };

          axios.put(url, tipoData)
            .then(response => {
              console.log(`Tipo de vehículo con ID ${idTipo} actualizado:`, response.data);
              rl.close();
            })
            .catch(error => {
              console.error(`Error actualizando Tipo de vehículo con ID ${idTipo}:`, error.response?.data || error.message);
              rl.close();
            });
        });
      });
    })
    .catch(error => {
      console.error(`Error actualizando Tipo de vehículo con ID ${idTipo}:`, 'Tipo de vehículo no encontrado');
      rl.close();
    });
});
