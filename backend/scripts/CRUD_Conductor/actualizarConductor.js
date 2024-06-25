const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/conductores';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID del Conductor que desea actualizar: ', (conductorId) => {
  const url = `${endpointUrl}/${conductorId}`;

  // Verificar si el Conductor con el ID proporcionado existe
  axios.get(url)
    .then(() => {
      rl.question('Ingrese el DNI/Pasaporte del conductor: ', (dniPasaporte) => {
        rl.question('Ingrese el apellido del conductor: ', (apellidoConductor) => {
          rl.question('Ingrese el nombre del conductor: ', (nombreConductor) => {
            rl.question('Ingrese la fecha de nacimiento del conductor (YYYY-MM-DD): ', (fechaNacimientoConductor) => {
              rl.question('Ingrese la licencia del conductor: ', (licenciaConductor) => {
                rl.question('Ingrese la fecha de otorgamiento de la licencia (YYYY-MM-DD): ', (fechaOtorgamientoLicencia) => {
                  rl.question('Ingrese el número de teléfono del conductor: ', (nroTelefonoConductor) => {
                    rl.question('Ingrese el email del conductor: ', (mailConductor) => {
                    const conductorData = {
                      dniPasaporte,
                      apellidoConductor,
                      nombreConductor,
                      fechaNacimientoConductor,
                      licenciaConductor,
                      fechaOtorgamientoLicencia,
                      nroTelefonoConductor,
                      mailConductor
                    };

                    axios.put(url, conductorData)
                      .then(response => {
                        console.log(`Conductor con ID ${conductorId} actualizada:`, response.data);
                        rl.close();
                      })
                      .catch(error => {
                        console.error(`Error actualizando Conductor con ID ${conductorId}:`, error.response?.data || error.message);
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
      console.error(`Error actualizando Conductor con ID ${conductorId}:`, 'Conductor no encontrado');
      rl.close();
    });
  })
});