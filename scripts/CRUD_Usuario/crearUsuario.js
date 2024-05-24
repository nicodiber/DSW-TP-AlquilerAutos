const axios = require('axios');
const readline = require('readline');

const endpointUrl = 'http://localhost:3000/usuarios';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createUser() {
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
                        rl.question('Ingrese el teléfono: ', (telefono) => {
                          const nuevoUsuario = {
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

                          axios.post(endpointUrl, nuevoUsuario)
                            .then(response => {
                              console.log('Usuario creado:', response.data);
                              rl.close();
                            })
                            .catch(error => {
                              console.error('Error creando usuario:', error.response?.data || error.message);
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
}

createUser();
