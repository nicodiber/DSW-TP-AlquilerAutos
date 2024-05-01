// Importamos los módulos necesarios de Node.js
const fs = require('fs'); // Módulo para interactuar con el sistema de archivos
const readline = require('readline'); // Módulo para leer la entrada del usuario por consola

// Creamos una instancia de la interfaz readline para leer la entrada del usuario
const rl = readline.createInterface({
  input: process.stdin, // Establecemos la entrada estándar como la entrada del usuario por consola
  output: process.stdout // Establecemos la salida estándar como la salida por consola
});

// Función para añadir una línea al archivo
function appendToFile(line) {
  // Utilizamos fs.appendFile() para agregar la línea al archivo especificado
  // La línea se agrega seguida de un salto de línea ('\n')
  fs.appendFile('archivo.txt', line + '\n', (err) => {
    if (err) throw err; // Manejo de errores: si ocurre un error, lo lanzamos
    console.log('Línea añadida al archivo correctamente.'); // Mensaje de éxito
    rl.close(); // Cerramos la interfaz readline para liberar recursos
  });
}

// Preguntamos al usuario la línea que desea añadir al archivo
rl.question('Ingrese la línea a añadir al archivo: ', (line) => {
  appendToFile(line); // Llamamos a la función appendToFile con la línea ingresada por el usuario como argumento
});
