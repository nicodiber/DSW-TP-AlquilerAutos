const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/sucursales';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID de la Sucursal que desea actualizar: ', (sucursalId) => {
  const url = `${endpointUrl}/${sucursalId}`;

  // Verificar si la sucursal con el ID proporcionado existe
  axios.get(url)
    .then(() => {
      rl.question('Ingrese la nueva denominación de la sucursal: ', (denominacionSucursal) => {
        rl.question('Ingrese el nuevo número de teléfono de la sucursal: ', (nroTelefonoSucursal) => {
          rl.question('Ingrese la nueva provincia de la sucursal: ', (provinciaSucursal) => {
            rl.question('Ingrese la nueva ciudad de la sucursal: ', (ciudadSucursal) => {
              rl.question('Ingrese la nueva dirección de la sucursal: ', (direccionSucursal) => {
                rl.question('Ingrese el nuevo horario de apertura de la sucursal (HH:MM): ', (horarioAperturaSucursal) => {
                  rl.question('Ingrese el nuevo horario de cierre de la sucursal (HH:MM): ', (horarioCierreSucursal) => {
                    const sucursalData = {
                      denominacionSucursal,
                      nroTelefonoSucursal,
                      provinciaSucursal,
                      ciudadSucursal,
                      direccionSucursal,
                      horarioAperturaSucursal,
                      horarioCierreSucursal
                    };

                    axios.put(url, sucursalData)
                      .then(response => {
                        console.log(`Sucursal con ID ${sucursalId} actualizada:`, response.data);
                        rl.close();
                      })
                      .catch(error => {
                        console.error(`Error actualizando Sucursal con ID ${sucursalId}:`, error.response?.data || error.message);
                        rl.close();
                      });
                  });
                });
              });
            });
          });
        });
      });
    })
    .catch(error => {
      console.error(`Error actualizando Sucursal con ID ${sucursalId}:`, 'Sucursal no encontrada');
      rl.close();
    });
});