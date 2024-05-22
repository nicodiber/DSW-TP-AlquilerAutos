const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/sucursales';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese la denominación de la nueva sucursal: ', (denominacionSucursal) => {
  rl.question('Ingrese el número de teléfono de la nueva sucursal: ', (nroTelefonoSucursal) => {
    rl.question('Ingrese la provincia de la nueva sucursal: ', (provinciaSucursal) => {
      rl.question('Ingrese la ciudad de la nueva sucursal: ', (ciudadSucursal) => {
        rl.question('Ingrese la dirección de la nueva sucursal: ', (direccionSucursal) => {
          rl.question('Ingrese el horario de apertura de la nueva sucursal (HH:MM): ', (horarioAperturaSucursal) => {
            rl.question('Ingrese el horario de cierre de la nueva sucursal (HH:MM): ', (horarioCierreSucursal) => {
              const nuevaSucursal = {
                denominacionSucursal,
                nroTelefonoSucursal,
                provinciaSucursal,
                ciudadSucursal,
                direccionSucursal,
                horarioAperturaSucursal,
                horarioCierreSucursal
              };

              axios.post(endpointUrl, nuevaSucursal)
                .then(response => {
                  console.log('Sucursal creada:', response.data);
                  rl.close();
                })
                .catch(error => {
                  console.error('Error creando sucursal:', error.response?.data || error.message);
                  rl.close();
                });
            });
          });
        });
      });
    });
  });
});