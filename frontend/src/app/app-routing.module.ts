// Importa los módulos necesarios de Angular
import { NgModule } from '@angular/core';  // NgModule se usa para definir un módulo de Angular
import { RouterModule, Routes } from '@angular/router';  // RouterModule y Routes son necesarios para definir las rutas en la aplicación

// Importa los componentes necesarios para las rutas
import { LayoutComponent } from './components/layout/layout.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ListarModelosComponent } from './components/modelo/modelo-listar/modelo-listar.component';
import { DetalleModeloComponent } from './components/modelo/detalle-modelo/detalle-modelo.component';
import { CrearModeloComponent } from './components/modelo/modelo-crear/modelo-crear.component';
import { LoginPageComponent } from './components/usuario/login-page/login-page.component';
import { TareasAdminComponent } from './components/tareas-admin-trabajador/tareas-admin/tareas-admin.component';
import { TareasTrabajadorComponent } from './components/tareas-admin-trabajador/tareas-trabajador/tareas-trabajador.component';
import { RegisterPageComponent } from './components/usuario/register-page/register-page.component';
import { ListarUsuariosComponent } from './components/usuario/listar-usuarios/listar-usuarios.component';
import { CrearAdminTrabajadorComponent } from './components/usuario/crear-admin-trabajador/crear-admin-trabajador.component';
import { SucursalCrearComponent } from './components/sucursal/sucursal-crear/sucursal-crear.component';
import { SucursalListarComponent } from './components/sucursal/sucursal-listar/sucursal-listar.component';
import { AlquilerCrearComponent } from './components/alquiler/alquiler-crear/alquiler-crear.component';
import { AlquilerListarComponent } from './components/alquiler/alquiler-listar/alquiler-listar.component';
import { AlquilerRevisionComponent } from './components/alquiler/alquiler-revision/alquiler-revision.component';
import { AlquilerCompletadoComponent } from './components/alquiler/alquiler-completado/alquiler-completado.component';
import { FormularioContactoComponent } from './components/formulario-contacto/formulario-contacto.component';
import { Error404Component } from './components/404/404.component';
import { ListarMarcaComponent } from './components/marca/listar-marca/listar-marca.component';
import { ListarModelosMarcaComponent } from './components/marca/listar-marca-modelo/listar-marca-modelo.component';
import { CrearMarcaComponent } from './components/marca/crear-marca/crear-marca.component';
import { ListarCategoriaComponent } from './components/categoria/listar-categoria/listar-categoria.component';
import { ListarCategoriaModeloComponent } from './components/categoria/listar-categoria-modelo/listar-categoria-modelo.component';
import { CrearCategoriaComponent } from './components/categoria/crear-categoria/crear-categoria.component';
import { ModificarCategoriaComponent } from './components/categoria/modificar-categoria/modificar-categoria.component';
import { ModificarMarcaComponent } from './components/marca/modificar-marca/modificar-marca.component';
import { AsignarTrabajadoresComponent } from './components/sucursal/asignar-trabajadores/asignar-trabajadores.component';

// Define las rutas de la aplicación
const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [  // Definición de ruta principal para el layout
      { path: 'modelo-listar', component: ListarModelosComponent },                             // Ruta para listar modelos de vehículos
      { path: 'modelo/:id', component: DetalleModeloComponent },                                // Ruta para ver el detalle de un modelo por ID
      { path: 'modelo-crear', component: CrearModeloComponent },                                // Ruta para crear un nuevo modelo de vehículo
      { path: 'modelo-editar/:id', component: CrearModeloComponent },                           // Ruta para editar un modelo de vehículo existente
      { path: 'loginUsuario', component: LoginPageComponent },                                  // Ruta para la página de login
      { path: 'registrar', component: RegisterPageComponent },                                  // Ruta para la página de registro
      { path: 'contacto', component: FormularioContactoComponent },                             // Ruta para la página de contacto
      { path: 'alquiler-revision', component: AlquilerRevisionComponent },                      // Ruta para la página de revisión de alquiler
      { path: 'alquiler-completado', component: AlquilerCompletadoComponent },                  // Ruta para la página de alquiler completado
      { path: 'buscador', component: BuscadorComponent },                                       // Ruta para el componente de búsqueda
    ]
  },

  // Rutas fuera del layout principal, generalmente para componentes administrativos
  { path: 'tareas-admin', component: TareasAdminComponent },                                    // Ruta para ver tareas administrativas
  { path: 'listarUsuarios', component: ListarUsuariosComponent },                               // Ruta para listar todos los usuarios
  { path: 'crear-admin-trabajador', component: CrearAdminTrabajadorComponent },                 // Ruta para crear un administrador o trabajador
  { path: 'editar-admin-trabajador/:id', component: CrearAdminTrabajadorComponent },            // Ruta para editar un administrador o trabajador por ID
  { path: 'sucursal-crear', component: SucursalCrearComponent },                                // Ruta para crear una nueva sucursal
  { path: 'sucursal-listar', component: SucursalListarComponent },                              // Ruta para listar todas las sucursales
  { path: 'sucursal-editar/:id', component: SucursalCrearComponent },                           // Ruta para editar una sucursal existente por ID
  { path: 'sucursal-eliminar', component: SucursalCrearComponent },                             // Ruta para eliminar una sucursal
  { path: 'alquiler-crear', component: AlquilerCrearComponent },                                // Ruta para crear un nuevo alquiler
  { path: 'alquiler-listar', component: AlquilerListarComponent },                              // Ruta para listar los alquileres
  { path: 'alquiler-editar/:id', component: AlquilerCrearComponent },                           // Ruta para editar un alquiler por ID
  { path: 'alquiler-eliminar', component: AlquilerCrearComponent },                             // Ruta para eliminar un alquiler
  { path: 'marca-crear', component: CrearMarcaComponent },                                      // Ruta para crear una nueva marca
  { path: 'marcas', component: ListarMarcaComponent },                                          // Ruta para listar todas las marcas
  { path: 'marca-modelos/:nombreMarca', component: ListarModelosMarcaComponent },               // Ruta para listar modelos de una marca específica
  { path: 'modificar-marca/:id', component: ModificarMarcaComponent },                          // Ruta para modificar una marca por ID
  { path: 'categoria-crear', component: CrearCategoriaComponent },                              // Ruta para crear una nueva categoría
  { path: 'categorias', component: ListarCategoriaComponent },                                  // Ruta para listar todas las categorías
  { path: 'categoria-modelos/:nombreCategoria', component: ListarCategoriaModeloComponent },    // Ruta para listar modelos de una categoría
  { path: 'modificar-categoria/:id', component: ModificarCategoriaComponent },                  // Ruta para modificar una categoría por ID
  { path: 'asignar-trabajadores/:id', component: AsignarTrabajadoresComponent },                // Ruta para asignar trabajadores a una sucursal

  // Ruta para manejar rutas no definidas, muestra el componente de error 404
  { path: '**', component: Error404Component }                                                  // Ruta comodín para manejar rutas inexistentes
];

// Configura el RouterModule con las rutas definidas
@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Inicializa el enrutador con las rutas definidas
  exports: [RouterModule]  // Exporta el RouterModule para que se pueda utilizar en toda la aplicación
})
export class AppRoutingModule { }  // Define el módulo de enrutamiento
