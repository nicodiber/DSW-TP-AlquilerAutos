const axios = require('axios');
const { connectDB, getNextSequenceValue } = require('../../src/database');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el tipo de vehículo: ', (tipoVehiculo) => {
  rl.question('Ingrese el precio del tipo de vehículo: ', async (precioTipo) => {
    rl.close();

    try {
      const db = await connectDB();

      // Obtener el próximo valor de la secuencia para el _id de tipo
      const tipoId = await getNextSequenceValue('tipoId');

      const nuevoTipo = {
        _id: tipoId,
        tipoVehiculo,
        precioTipo
      };

      // Insertar en la colección 'tipos'
      const result = await db.collection('tipos').insertOne(nuevoTipo);

      // Verificar que la inserción fue exitosa antes de proceder
      if (result && result.acknowledged && result.insertedId) {
        console.log('Tipo creado correctamente con ID:', result.insertedId);
      } else {
        throw new Error('No se pudo insertar el nuevo Tipo correctamente.');
      }

    } catch (error) {
      console.error('Error creando Tipo:', error.response?.data || error.message);
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
