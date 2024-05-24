const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/tipos';

// Crear una instancia de readline para leer entradas del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para crear un nuevo tipo de vehículo
function createTipo() {
  // Solicitar cada atributo del tipo de vehículo al usuario final
  rl.question('Ingrese el tipo de vehículo: ', (tipoVehiculo) => {
    rl.question('Ingrese el precio del tipo de vehículo: ', (precioTipo) => {
      // Crear un objeto con los datos del nuevo tipo de vehículo
      const nuevoTipo = {
        tipoVehiculo,
        precioTipo
      };

      // Enviar una solicitud POST para crear el nuevo tipo de vehículo
      axios.post(endpointUrl, nuevoTipo)
        .then(response => {
          console.log('Tipo de vehículo creado:', response.data);
          rl.close(); // Cerrar la interfaz de readline
        })
        .catch(error => {
          console.error('Error creando tipo de vehículo:', error.response?.data || error.message);
          rl.close(); // Cerrar la interfaz de readline en caso de error
        });
    });
  });
}

createTipo();
