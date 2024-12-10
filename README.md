# Proyecto - Desarrollo De Software 2024

![logo-utn](https://frro.cvg.utn.edu.ar/pluginfile.php/1/theme_snap/logo/1710991180/logo-utn-siglas.png)

# TP-AlquilerAutos

Integrantes:

- 47.792 - Neirotti, Bruno Augusto

- 47.863 - Di Bernardo, Nicolás David

- 47.898 - Tebes, Alexander Daniel

- 47.960 - Mirleni, Eliseo

# Tema

_Sistema de gestión de alquileres de vehículos "Nebarent"_

El propósito de este proyecto es proporcionar una plataforma integral y fácil de usar donde ofertar vehículos en alquiler en función de la sucursal deseada, teniendo en cuenta las características correspondientes (ej. modelo, categoría, marca, entre otros); tanto para clientes como para trabajadores y administradores de la empresa.

![modelo-dominio](https://raw.githubusercontent.com/nicodiber/DSW-TP-AlquilerAutos/refs/heads/main/assets/modelo-dominio.png)

| Requerimiento     | Detalle                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Crud Simple       | - Categoría<br>- Marca<br>- Usuario<br>- Sucursal                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Crud Dependiente  | - Modelo { depende de } Categoría, Marca<br>- Auto { depende de } Modelo, Sucursal<br> - Mantenimiento { depende de } Auto, Usuario<br>- Incidente { depende de } Alquiler                                                                                                                                                                                                                                                                                                                                             |
| Crud Principal    | - Alquiler { depende de } Auto, Usuario, Sucursal                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Listado + Detalle | - Listado de todos los Usuarios de la empresa<br>- Listado de todas las Sucursales de la empresa<br>- Listado de todos las Categorías y Marcas de la empresa<br>- Listado de todos los Modelos de la empresa<br>- Listado de todos los Autos de la empresa, con sus respectivos estados<br>- Listado de todos los Alquileres de la empresa, con sus respectivos estados<br>- Filtros para el listado de Modelos disponibles: Categoria y Marca<br>- Ordenamiento por columna en el Listado de Alquileres de la empresa |
| CUU/Epic          | - Dar de alta un Modelo y un Auto nuevo para ofertar en Alquiler<br>- Realizar un alquiler de vehículo<br>- Realizar una extensión o cancelación de un Alquiler<br>- Cerrar un Alquiler finalizado                                                                                                                                                                                                                                                                                                                     |

# Especificaciones técnicas

- Lenguaje de programación principal: JavaScript y TypeScript
- Gestión de Paquetes: NPM v10.8.0
- Entorno de ejecución: NodeJS v20.13.1
- Framework Backend: Express v4.19.2
- Framework Frontend: Angular v18.0.6
- Base de Datos: MongoDB
- Lenguaje de marcado (Frontend): HTML5
- Lenguaje de diseño gráfico (Frontend): CSS
- Otros: Mongoose v8.5.1, Nodemon (cambios en tiempo real), Toastr (animaciones) y Multer (imágenes)

# Aclaraciones

- Al manejarnos con MongoDB es útil aclarar que todos los registros podrán verse también si se tiene la aplicación de MongoDB Compass, que al tratarse en una GUI nos permitirá ver con mucha más claridad los registros existentes y/o los cambios en cada colección de la base de datos.
- Para correr esta entrega del TP, se deberá abrir una terminal desde el Backend y a continuación escribir "npm run dev", lo que permitirá enlazar la base de datos. Luego, se podrá abrir otra terminal y desde el Frontend ejecutar el comando "ng serve --o", lo que ejecutará y abrirá el servidor de desarrollo con cambios en tiempo real en la dirección 'http://localhost:4200/'. El backend se ejecuta en tiempo real en la dirección 'http://localhost:4000/', si bien no es necesario tenerlo abierto ya que todos los cambios son visibles desde la navegación del frontend.
- ¿Por qué "Nebarent"? Nuestro nombre de fantasía elegido surge de nuestros nombres: N: Nicolás, E: Eliseo, B: Bruno, A: Alexander. Sumado a la palabra en inglés "rent" para asociarnos como empresa de Rental de vehículos.
