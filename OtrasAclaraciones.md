# Especificaciones técnicas

- Lenguaje de programación: JavaScript
- Gestión de Paquetes: NPM v10.8.0
- Entorno de ejecución: NodeJS v20.13.1
- Framework Backend: Express v4.19.2
- Framework Frontend: Angular v18.0.6
- Base de Datos: Mongoose v8.5.1
- Otros: Nodemon v3.1.4 (cambios en tiempo real) y Toastr v19.0 (animaciones)

# Aclaraciones pertinentes a esta entrega

- Al manejarnos con MongoDB es útil aclarar que todos los registros podrán verse también desde MongoDB Compass, que al tratarse en una GUI nos permitirá ver con mucha más claridad los registros existentes y/o los cambios en cada tabla de la base de datos.
- Para esta entrega, se ha mantenido el desarrollo en backend del CRUD para los siguientes objetos: 'Conductor', 'Sucursal', 'Tipo' (de modelo) y 'Usuario'. Asimismo, se complementa con el pedido de la fecha en avanzar en el frontend con una muestra de un listado completo de 'Conductores', pudiendo añadir, editar o borrar impactando en tiempo real en el frontend y en la base de datos asociada.
- Para correr esta entrega del TP, se deberá abrir una terminal desde el Backend y a continuación escribir "npm run dev", lo que permitirá enlazar la base de datos. Luego, se podrá abrir otra terminal y desde el Frontend ejecutar el comando "ng serve --o", lo que ejecutará y abrirá el servidor de desarrollo con cambios en tiempo real en la dirección 'http://localhost:4200/'. Si se quiere revisar de forma manual siguiendo las rutas de las distintas colecciones, se puede hacer desde el url 'http://localhost:4000/' (por ejemplo 'http://localhost:4000/api/conductores/'),
- Respecto al Frontend, aun seguimos realizando ajustes (tanto al código como a la estructura) ya que es lo último en lo que hemos profundizado, si bien ya está funcional lo solicitado para esta entrega.
