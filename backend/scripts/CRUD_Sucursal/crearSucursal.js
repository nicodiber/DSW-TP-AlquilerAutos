const axios = require('axios');
const { connectDB, getNextSequenceValue } = require('../../src/database');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese la denominación de la nueva sucursal: ', async (denominacionSucursal) => {
  rl.question('Ingrese el número de teléfono de la nueva sucursal: ', async (nroTelefonoSucursal) => {
    rl.question('Ingrese la provincia de la nueva sucursal: ', async (provinciaSucursal) => {
      rl.question('Ingrese la ciudad de la nueva sucursal: ', async (ciudadSucursal) => {
        rl.question('Ingrese la dirección de la nueva sucursal: ', async (direccionSucursal) => {
          rl.question('Ingrese el horario de apertura de la nueva sucursal (HH:MM): ', async (horarioAperturaSucursal) => {
            rl.question('Ingrese el horario de cierre de la nueva sucursal (HH:MM): ', async (horarioCierreSucursal) => {
              rl.close();

              try {
                const db = await connectDB();

                // Obtener el próximo valor de la secuencia para el _id de sucursal
                const sucursalId = await getNextSequenceValue('sucursalId');

                const nuevaSucursal = {
                  _id: sucursalId,
                  denominacionSucursal,
                  nroTelefonoSucursal,
                  provinciaSucursal,
                  ciudadSucursal,
                  direccionSucursal,
                  horarioAperturaSucursal,
                  horarioCierreSucursal
                };

                // Insertar en la colección 'sucursales'
                const result = await db.collection('sucursales').insertOne(nuevaSucursal);

                // Verificar que la inserción fue exitosa antes de proceder
                if (result && result.acknowledged && result.insertedId) {
                  console.log('Sucursal creada correctamente con ID:', result.insertedId);
                } else {
                  throw new Error('No se pudo insertar la nueva Sucursal correctamente.');
                }

              } catch (error) {
                console.error('Error creando Sucursal:', error);
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
