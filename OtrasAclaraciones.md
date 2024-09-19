# Especificaciones técnicas

- Lenguaje de programación principal: JavaScript y TypeScript
- Gestión de Paquetes: NPM v10.8.0
- Entorno de ejecución: NodeJS v20.13.1
- Framework Backend: Express v4.19.2
- Framework Frontend: Angular v18.0.6
- Base de Datos: Mongoose v8.5.1
- Lenguaje de marcado (Frontend): HTML5
- Lenguaje de diseño gráfico (Frontend): CSS
- Otros: Nodemon v3.1.4 (cambios en tiempo real) y Toastr v19.0 (animaciones)

# Aclaraciones pertinentes a esta entrega

- Al manejarnos con MongoDB es útil aclarar que todos los registros podrán verse también si se tiene la aplicación de MongoDB Compass, que al tratarse en una GUI nos permitirá ver con mucha más claridad los registros existentes y/o los cambios en cada tabla de la base de datos.
- Para esta entrega, se posee ya desarrollo en backend del CRUD para los siguientes objetos: 'Conductor', 'Sucursal', 'Tipo' (de modelo), 'Modelo' y 'Usuario'. Asimismo, se complementa con el pedido de la fecha en avanzar en el frontend con una muestra de un listado completo de 'Modelos' de forma dinámica en el frontend (carta con atributos dinámicos según cada instancia existente) y su respectivas landing page, así como el de 'Conductores'; pudiendo añadir, editar o borrar impactando en tiempo real en el frontend y en la base de datos asociada.
- Para correr esta entrega del TP, se deberá abrir una terminal desde el Backend y a continuación escribir "npm run dev", lo que permitirá enlazar la base de datos. Luego, se podrá abrir otra terminal y desde el Frontend ejecutar el comando "ng serve --o", lo que ejecutará y abrirá el servidor de desarrollo con cambios en tiempo real en la dirección 'http://localhost:4200/'.
- Desde el frontend, en la dirección http://localhost:4200/listarModelos se podrán visualizar la colección de modelos existentes e ingresar a sus respectivas landing pages clickeando en su carta del frontend. Sin embargo, si se quiere revisar de forma manual siguiendo las rutas de las distintas colecciones, aún en esta instancia se puede hacer desde el url 'http://localhost:4000/' (por ejemplo 'http://localhost:4000/api/modelos/'),
- Para crear un nuevo modelo, se puede acceder a la dirección http://localhost:4200/crearModelo, de igual manera que si se quisiera crear un conductor se puede hacer desde http://localhost:4200/crearConductor, y ver el listado en la dirección http://localhost:4200/listarConductores. Respecto a esto, aún queda refinar la validación de los campos (definir de forma final los atributos de cada objeto del modelo de dominio) y a futuro limitar esas direcciones solo a los usuarios administradores y no a visitantes.
- Aclaración: hay algunas páginas de navegación que no están visibles en el menú del frontend, o bien que aún no están con sus funcionalidades completamente desarrolladas (se ha planteado solo la estructura), que podrá ser utilizada para próximas entregas.
- ¿Por qué "Nebarent"? Nuestro nombre de fantasía elegido surge de nuestros nombres: N: Nicolás, E: Eliseo, B: Bruno, A: Alexander. Sumado a la palabra en inglés "rent" para asociarnos como empresa de Rental de vehículos.
