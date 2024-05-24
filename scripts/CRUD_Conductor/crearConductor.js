const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/conductores';

// Crear una instancia de readline para leer entradas del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para crear un nuevo conductor
function createConductor() {
  // Solicitar cada atributo del conductor al usuario final
  rl.question('Ingrese el DNI/Pasaporte del conductor: ', (dniPasaporte) => {
    rl.question('Ingrese el apellido del conductor: ', (apellidoConductor) => {
      rl.question('Ingrese el nombre del conductor: ', (nombreConductor) => {
        rl.question('Ingrese la fecha de nacimiento del conductor (YYYY-MM-DD): ', (fechaNacimientoConductor) => {
          rl.question('Ingrese la licencia del conductor: ', (licenciaConductor) => {
            rl.question('Ingrese la fecha de otorgamiento de la licencia (YYYY-MM-DD): ', (fechaOtorgamientoLicencia) => {
              rl.question('Ingrese el número de teléfono del conductor: ', (nroTelefonoConductor) => {
                rl.question('Ingrese el email del conductor: ', (mailConductor) => {
                  // Crear un objeto con los datos del nuevo conductor
                  const nuevoConductor = {
                    dniPasaporte,
                    apellidoConductor,
                    nombreConductor,
                    fechaNacimientoConductor,
                    licenciaConductor,
                    fechaOtorgamientoLicencia,
                    nroTelefonoConductor,
                    mailConductor
                  };

                  // Enviar una solicitud POST para crear el nuevo conductor
                  axios.post(endpointUrl, nuevoConductor)
                    .then(response => {
                      console.log('Conductor creado:', response.data);
                      rl.close(); // Cerrar la interfaz de readline
                    })
                    .catch(error => {
                      console.error('Error creando conductor:', error.response?.data || error.message);
                      rl.close(); // Cerrar la interfaz de readline en caso de error
                    });
                });
              });
            });
          });
        });
      });
    });
  });
}

createConductor();
