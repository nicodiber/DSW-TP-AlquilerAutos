const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/usuarios';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID del Usuario que desea actualizar: ', (idUsuario) => {
  const url = `${endpointUrl}/${idUsuario}`;

  // Verificar si el usuario con el ID proporcionado existe
  axios.get(url)
    .then(() => {
      rl.question('Ingrese el nuevo email del usuario: ', (email) => {
        rl.question('Ingrese el nuevo nombre del usuario: ', (nombre) => {
          rl.question('Ingrese el nuevo apellido del usuario: ', (apellido) => {
            rl.question('Ingrese el nuevo nombre de usuario: ', (nombreUsuario) => {
              rl.question('Ingrese la nueva contraseña: ', (contraseña) => {
                rl.question('Ingrese el nuevo CUIL: ', (cuil) => {
                  rl.question('Ingrese la nueva situación fiscal: ', (situacionFiscal) => {
                    rl.question('Ingrese la nueva provincia: ', (provincia) => {
                      rl.question('Ingrese la nueva ciudad: ', (ciudad) => {
                        rl.question('Ingrese el nuevo código postal: ', (codigoPostal) => {
                          rl.question('Ingrese la nueva dirección: ', (direccion) => {
                            rl.question('Ingrese el nuevo teléfono: ', (telefono) => {
                              const userData = {
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

                              axios.put(url, userData)
                                .then(response => {
                                  console.log(`Usuario con ID ${idUsuario} actualizado:`, response.data);
                                  rl.close();
                                })
                                .catch(error => {
                                  console.error(`Error actualizando Usuario con ID ${idUsuario}:`, error.response?.data || error.message);
                                  rl.close();
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
      });
    })
    .catch(error => {
      console.error(`Error actualizando Usuario con ID ${idUsuario}:`, 'Usuario no encontrado');
      rl.close();
    });
});
