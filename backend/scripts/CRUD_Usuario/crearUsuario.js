const axios = require('axios');
const { connectDB, getNextSequenceValue } = require('../../src/database');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el email del usuario: ', (email) => {
  rl.question('Ingrese el nombre del usuario: ', (nombre) => {
    rl.question('Ingrese el apellido del usuario: ', (apellido) => {
      rl.question('Ingrese el nombre de usuario: ', (nombreUsuario) => {
        rl.question('Ingrese la contraseña: ', (contraseña) => {
          rl.question('Ingrese el CUIL: ', (cuil) => {
            rl.question('Ingrese la situación fiscal: ', (situacionFiscal) => {
              rl.question('Ingrese la provincia: ', (provincia) => {
                rl.question('Ingrese la ciudad: ', (ciudad) => {
                  rl.question('Ingrese el código postal: ', (codigoPostal) => {
                    rl.question('Ingrese la dirección: ', (direccion) => {
                      rl.question('Ingrese el teléfono: ', async (telefono) => {
                        rl.close();

                        try {
                          const db = await connectDB();

                          // Obtener el próximo valor de la secuencia para el _id de usuario
                          const usuarioId = await getNextSequenceValue('usuarioId');

                          const nuevoUsuario = {
                            _id: usuarioId,
                            email,
                            nombre,
                            apellido,
                            nombreUsuario,
                            contraseña,
                            cuil,
                            situacionFiscal,
                            provincia,
                            ciudad,
                            codigoPostal,
                            direccion,
                            telefono
                          };

                          // Insertar en la colección 'usuarios'
                          const result = await db.collection('usuarios').insertOne(nuevoUsuario);

                          // Verificar que la inserción fue exitosa antes de proceder
                          if (result && result.acknowledged && result.insertedId) {
                            console.log('Usuario creado correctamente con ID:', result.insertedId);
                          } else {
                            throw new Error('No se pudo insertar el nuevo Usuario correctamente.');
                          }

                        } catch (error) {
                          console.error('Error creando Usuario:', error.response?.data || error.message);
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
      });
    });
  });
});
