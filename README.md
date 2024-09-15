# Proyecto - Desarrollo De Software 2024

![logo-utn](https://frro.cvg.utn.edu.ar/pluginfile.php/1/theme_snap/logo/1710991180/logo-utn-siglas.png)

# TP-AlquilerAutos

Integrantes:

- 47.792 - Neirotti, Bruno Augusto

- 47.863 - Di Bernardo, Nicolás David

- 47.898 - Tebes, Alexander Daniel

- 47.960 - Mirleni, Eliseo

# Tema

_Sistema de gestión de alquileres de autos_

El propósito de este proyecto es proporcionar una plataforma integral y fácil de usar donde ofertar autos en alquiler en distintas sucursales, teniendo en cuenta las características del vehículo (tipo del auto, gama del auto, marca del auto y modelo del auto) y la cantidad de días del alquiler.

![modelo-dominio](https://github.com/nicodiber/DSW-TP-AlquilerAutos/assets/71459973/9f5feb65-eef2-4d89-9d4d-c7cd9a3b88f9)

| Requerimiento     | Detalle                                                                                                                                                                                                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Crud Simple       | - Tipo<br>- Gama<br>- Marca<br>- Sucursal<br>- Conductor<br>- Usuario                                                                                                                                                                                                                                                                |
| Crud Dependiente  | - Modelo { depende de } Tipo, Gama, Marca<br>- Auto { depende de } Modelo, Sucursal                                                                                                                                                                                                                                                  |
| Crud Principal    | - Alquiler { depende de } Auto, Cliente, Conductor                                                                                                                                                                                                                                                                                   |
| Listado + Detalle | - Listado de todos los autos de la empresa<br>- Listado de Autos disponibles en base a Tipo o Gama elegido<br>- Listado de Autos disponibles en base al rango de fechas de retiro y de devolución<br> Filtros generales para los listados: Tipo, Gama, precio mayor a menor, precio menor a mayor, cantidad asientos, transmisión... |
| CUU/Epic          | - Dar de alta un Auto nuevo para ofertar en alquiler<br>- Realizar un alquiler de auto<br>- Realizar una extensión de un alquiler<br>- Cerrar un alquiler finalizado                                                                                                                                                                 |
