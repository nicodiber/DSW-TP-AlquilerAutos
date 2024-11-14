const mongoose = require('mongoose');

// Define el esquema para las sucursales
const SucursalSchema = new mongoose.Schema({
  // Campo ID único y secuencial generado para cada sucursal
  _id: {
    type: Number,            // Define el tipo de datos como Número
    required: true           // Campo obligatorio
  },
  
  // Campo nombre de la sucursal
  nombreSucursal: {
    type: String,            // Tipo de datos String
    required: true,          
    unique: true,            // Debe ser único en la colección, no se permiten nombres duplicados
  },
  
  // Campo número de teléfono de la sucursal
  telefonoSucursal: {
    type: String,            
    required: true,          
  },
  
  // Campo dirección física de la sucursal
  direccionSucursal: {
    type: String,            
    required: true,          
  },
  
  // Campo país donde se encuentra la sucursal
  paisSucursal: {
    type: String,            
    required: true           
  },
  
  // Campo provincia o estado de la sucursal
  provinciaSucursal: {
    type: String,            
    required: true           
  },
  
  // Campo ciudad donde se ubica la sucursal
  ciudadSucursal: {
    type: String,            
    required: true           
  },
  
  // Campo hora de apertura de la sucursal
  horaAperturaSucursal: {
    type: String,            
    required: true           
  },
  
  // Campo hora de cierre de la sucursal
  horaCierreSucursal: {
    type: String,            
    required: true           
  },
  
  // Campo lista de trabajadores asignados a la sucursal
  trabajadores: [{
    type: mongoose.Schema.Types.Number, // Referencia a la colección "Usuario" por su ID único de MongoDB
    ref: 'Usuario',                        // Define la referencia al modelo Usuario
  }],
  
  // Campo lista de autos asignados a la sucursal
  autos: [{
    type: mongoose.Schema.Types.Number,    // Referencia a un ID de auto en la colección "Auto"
    ref: 'Auto'                            // Define la referencia al modelo Auto
  }],
  
}, { collection: 'sucursales' });          // Define el nombre de la colección como 'sucursales'

module.exports = mongoose.model('Sucursal', SucursalSchema);
