const axios = require('axios');
const { connectDB, getNextSequenceValue } = require('../../src/database');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el DNI/Pasaporte del conductor: ', async (dniPasaporte) => {
  rl.question('Ingrese el apellido del conductor: ', async (apellidoConductor) => {
    rl.question('Ingrese el nombre del conductor: ', async (nombreConductor) => {
      rl.question('Ingrese la fecha de nacimiento del conductor (YYYY-MM-DD): ', async (fechaNacimientoConductor) => {
        rl.question('Ingrese la licencia del conductor: ', async (licenciaConductor) => {
          rl.question('Ingrese la fecha de otorgamiento de la licencia (YYYY-MM-DD): ', async (fechaOtorgamientoLicencia) => {
            rl.question('Ingrese el número de teléfono del conductor: ', async (nroTelefonoConductor) => {
              rl.question('Ingrese el email del conductor: ', async (mailConductor) => {
                rl.close();

                try {
                  const db = await connectDB();

                  // Obtener el próximo valor de la secuencia para el _id del conductor
                  const conductorId = await getNextSequenceValue('conductorId');

                  // Crear el objeto de documento para el nuevo conductor
                  const nuevoConductor = {
                    _id: conductorId,
                    dniPasaporte,
                    apellidoConductor,
                    nombreConductor,
                    fechaNacimientoConductor,
                    licenciaConductor,
                    fechaOtorgamientoLicencia,
                    nroTelefonoConductor,
                    mailConductor
                  };

                  // Insertar el documento en la colección 'conductores'
                  const result = await db.collection('conductores').insertOne(nuevoConductor);

                  // Verificar que la inserción fue exitosa antes de proceder
                  if (result && result.acknowledged && result.insertedId) {
                    console.log('Conductor creado correctamente con ID:', result.insertedId);
                  } else {
                    throw new Error('No se pudo insertar el nuevo Conductor correctamente.');
                  }

                } catch (error) {
                  console.error('Error creando Conductor:', error);
                  if (axios.isAxiosError(error)) {
                    if (error.response) {
                      console.error('Error en la respuesta del servidor:', error.response.data);
                    } else if (error.request) {
                      console.error('No se recibió respuesta del servidor:', error.request);
                    } else {
                      console.error('Error durante la configuración de la solicitud:', error.message);
                    }
                  }

                } finally {
                  process.exit(0); // Salir del proceso cuando haya terminado todo
                }
              });
            });
          });
        });
      });
    });
  });
});