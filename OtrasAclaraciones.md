# Especificaciones técnicas

- Lenguaje de programación: JavaScript
- Gestión de Paquetes: NPM v10.8.0
- Entorno de ejecución: NodeJS v20.13.1
- Framework Backend: Express v4.19.2
- Framework Frontend: Angular v14.2
- Solicitudes HTTP: Axios v1.7.2
- Base de Datos: MongoDB 7.0.11

# Aclaraciones generales

- En el repositorio están presentas las carpetas backend y frontend. En relación al contenido de la carpeta backend: dentro de la misma se encuentra la carpeta 'node_modules' con los módulos de NodeJS; una carpeta de 'src' donde está el código fuente estructurado según el controlador, la ruta, el index.js y el database.js; y otra carpeta de scripts utilizada en esta entrega para testear y simular añadidos y modificaciones en las bases de datos y colecciones. En relación al contenido de la carpeta frontend: como solicita esta entrega, está ya planteado el boilerplate inicial de los archivos que serán necesarios.
- Al manejarnos con MongoDB es útil aclarar que todos los registros podrán verse también desde MongoDB Compass, que al tratarse en una GUI nos permitirá ver con mucha más claridad los registros existentes y/o los cambios en cada tabla de la base de datos.
- En línea con lo anterior, al utilizar MongoDB y particularmente su librería para NodeJS no se necesita un modelo definidos formalmente. Esto permite una mayor agilidad en el desarrollo de aplicaciones que necesitan gestionar datos de manera dinámica. Es por esto que no existe actualmente una carpeta 'models' dentro del 'src' del backend.
- Los IDs de las Sucursales se crean secuencialmente. Si una sucusal se actualiza, su ID no cambia. Si una Sucursal se borra, no se tomará su ID al crear otra nueva sino que quedará inexistente y las próximas Sucursales se crearán con el ID que siga secuencialmente.

# Aclaraciones pertinentes a esta entrega

- Para esta segunda entrega, se han desarrollado el CRUD para los siguientes objetos: 'Conductor', 'Sucursal', 'Tipo' (de modelo) y 'Usuario'.
- Para correr esta entrega del TP, se deberá abrir una terminal desde el Backend y a continuación escribir "npm start", lo que permitirá ejecutar el servidor local y enlazar la Base de Datos. Luego, se podrá abrir otra terminal y ejecutar cada uno de los scripts planteados (por ejemplo, se puede ingresar en la segunda terminal "node ./backend/scripts/CRUD_Sucursal/crearSucursal.js", "node ./backend/scripts/CRUD_Sucursal/obtenerSucursales.js", etc.).
- Si bien desde la terminal se puede probar el CRUD mediante los comandos mencionados anteriormente, también se pueden consultar los objetos a través del localhost. Por ejemplo, todas las Sucursales podrán verse desde el a través del url 'http://localhost:3000/sucursales/', o bien se podrá ver una determinada Sucursal según su id usando 'http://localhost:3000/sucursales/id_sucursal' (reemplazar 'id_sucursal' por el número correspondiente).

# MongoDB Atlas

Username: admin
Password: 3d2UdEE70VvIUXfD
