# Especificaciones técnicas

- Lenguaje de programación: JavaScript
- Entorno de ejecución: NodeJS v20.13.1
- Framework Frontend: Next.js v14.2
- Framework Backend: Express v4.19.2
- Solicitudes HTTP: Axios v1.7.2

# Aclaraciones pertinentes

- El repositorio presenta una carpeta 'node_modules' con los módulos de NodeJS; una carpeta de 'src' donde está el código fuente estructurado según el controlador, el modelo, la ruta y el index.js; y otra carpeta de scripts utilizada en esta entrega para testear y simular lo desarrollado.
- El objeto elegido para esta primer entrega es 'Sucursal', del cual se ha desarrollado su correspondiente CRUD.
- Para correr esta entrega del TP, se deberá abrir una terminal e ingresar "npm start", lo que permitirá ejecutar el servidor local. Luego, se podrá abrir otra terminal y ejecutar cada uno de los scripts planteados (ej. se puede ingresar en la segunda terminal "node scripts/crearSucursal.js", "node scripts/obtenerSucursales.js", etc.).
- Si bien desde la terminal se puede probar el CRUD mediante los comandos mencionados anteriormente, asimismo todas las Sucursales podrán verse desde el localhost a través del url 'http://localhost:3000/sucursales/', o bien se podrá ver una determinada Sucursal según su id 'http://localhost:3000/sucursales/id_sucursal' (reemplazar 'id_sucursal' por el número correspondiente).
- Los IDs de las Sucursales se crean secuencialmente. Si una sucusal se actualiza, su ID no cambia. Si una Sucursal se borra, no se tomará su ID al crear otra nueva sino que quedará inexistente.
- Los archivos 'appendToFile.js' y 'old-index.js' son independientes del resto de los archivos del repositorio (no están relacionados) ya que allí habíamos planteado inicialmente algunos conceptos vistos en clase.
