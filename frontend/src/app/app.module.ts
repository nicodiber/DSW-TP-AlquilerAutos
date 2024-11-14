// Importación de módulos necesarios para configurar la aplicación Angular
import { NgModule, LOCALE_ID } from '@angular/core';                                                                                  // NgModule para definir el módulo de la aplicación y LOCALE_ID para la configuración regional
import { BrowserModule } from '@angular/platform-browser';                                                                            // Necesario para ejecutar la aplicación en el navegador
import { CommonModule } from '@angular/common';                                                                                       // Proporciona funcionalidades comunes como directivas y pipes
import { ReactiveFormsModule, FormsModule } from '@angular/forms';                                                                    // Importación de módulos para formularios reactivos y formularios con ngModel
import { AppRoutingModule } from './app-routing.module';                                                                              // Módulo de enrutamiento de la aplicación
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';                                                       // Necesario para habilitar animaciones en Angular, en este caso usado por Toastr
import { ToastrModule } from 'ngx-toastr';                                                                                            // Módulo para mostrar notificaciones de Toastr
import { provideHttpClient } from '@angular/common/http';                                                                             // Para realizar solicitudes HTTP
import { RouterModule } from '@angular/router';                                                                                       // Necesario para manejar rutas y enrutamiento
import { CookieService } from 'ngx-cookie-service';                                                                                   // Para trabajar con cookies

// Configuración regional para fechas en español
import localeEs from '@angular/common/locales/es';                                                                                    // Importa los datos locales de España
import { registerLocaleData } from '@angular/common';                                                                                 // Función para registrar la configuración regional
registerLocaleData(localeEs, 'es');  // Registra el formato español como idioma predeterminado

// Importación de componentes de la aplicación
import { AppComponent } from './app.component';                                                                                       // Componente principal de la aplicación
import { LayoutComponent } from './components/layout/layout.component';                                                               // Componente de la estructura principal
import { BuscadorComponent } from './components/buscador/buscador.component';                                                         // Componente para el buscador
import { ListarModelosComponent } from './components/modelo/modelo-listar/modelo-listar.component';                                   // Componente para listar modelos
import { DetalleModeloComponent } from './components/modelo/detalle-modelo/detalle-modelo.component';                                 // Componente para ver el detalle de un modelo
import { CrearModeloComponent } from './components/modelo/modelo-crear/modelo-crear.component';                                       // Componente para crear un nuevo modelo
import { LoginPageComponent } from './components/usuario/login-page/login-page.component';                                            // Componente de login de usuario
import { TareasAdminComponent } from './components/tareas-admin-trabajador/tareas-admin/tareas-admin.component';                      // Componente para tareas administrativas
import { TareasTrabajadorComponent } from './components/tareas-admin-trabajador/tareas-trabajador/tareas-trabajador.component';       // Componente para tareas de trabajador
import { RegisterPageComponent } from './components/usuario/register-page/register-page.component';                                   // Componente de registro de usuario
import { ListarUsuariosComponent } from './components/usuario/listar-usuarios/listar-usuarios.component';                             // Componente para listar usuarios
import { CrearAdminTrabajadorComponent } from './components/usuario/crear-admin-trabajador/crear-admin-trabajador.component';         // Componente para crear administradores o trabajadores
import { SucursalCrearComponent } from './components/sucursal/sucursal-crear/sucursal-crear.component';                               // Componente para crear una nueva sucursal
import { SucursalListarComponent } from './components/sucursal/sucursal-listar/sucursal-listar.component';                            // Componente para listar sucursales
import { AlquilerCrearComponent } from './components/alquiler/alquiler-crear/alquiler-crear.component';                               // Componente para crear alquileres
import { AlquilerListarComponent } from './components/alquiler/alquiler-listar/alquiler-listar.component';                            // Componente para listar alquileres
import { AlquilerRevisionComponent } from './components/alquiler/alquiler-revision/alquiler-revision.component';                      // Componente para revisión de alquileres
import { AlquilerCompletadoComponent } from './components/alquiler/alquiler-completado/alquiler-completado.component';                // Componente para mostrar alquileres completados
import { FormularioContactoComponent } from './components/formulario-contacto/formulario-contacto.component';                         // Componente para el formulario de contacto
import { Error404Component } from './components/404/404.component';                                                                   // Componente para manejar rutas no encontradas (404)
import { ListarMarcaComponent } from './components/marca/listar-marca/listar-marca.component';                                        // Componente para listar marcas
import { ListarModelosMarcaComponent } from './components/marca/listar-marca-modelo/listar-marca-modelo.component';                   // Componente para listar modelos por marca
import { CrearMarcaComponent } from './components/marca/crear-marca/crear-marca.component';                                           // Componente para crear una nueva marca
import { ListarCategoriaComponent } from './components/categoria/listar-categoria/listar-categoria.component';                        // Componente para listar categorías
import { ListarCategoriaModeloComponent } from './components/categoria/listar-categoria-modelo/listar-categoria-modelo.component';    // Componente para listar modelos por categoría
import { CrearCategoriaComponent } from './components/categoria/crear-categoria/crear-categoria.component';                           // Componente para crear una nueva categoría
import { ModificarCategoriaComponent } from './components/categoria/modificar-categoria/modificar-categoria.component';               // Componente para modificar categorías
import { ModificarMarcaComponent } from './components/marca/modificar-marca/modificar-marca.component';                               // Componente para modificar marcas
import { AsignarTrabajadoresComponent } from './components/sucursal/asignar-trabajadores/asignar-trabajadores.component';             // Componente para asignar trabajadores a sucursales

@NgModule({
  // Declaración de componentes que forman parte del módulo
  declarations: [
    AppComponent,                       // Componente raíz de la aplicación
    LayoutComponent,                    // Componente de la estructura general de la app
    BuscadorComponent,                  // Componente para la barra de búsqueda
    ListarModelosComponent,             // Componente para mostrar todos los modelos
    DetalleModeloComponent,             // Componente para ver el detalle de un modelo específico
    CrearModeloComponent,               // Componente para crear un nuevo modelo
    LoginPageComponent,                 // Componente para la página de login
    TareasAdminComponent,               // Componente para ver las tareas administrativas
    TareasTrabajadorComponent,          // Componente para ver las tareas del trabajador
    RegisterPageComponent,              // Componente para la página de registro de usuario
    ListarUsuariosComponent,            // Componente para listar usuarios registrados
    CrearAdminTrabajadorComponent,      // Componente para crear un administrador o trabajador
    SucursalCrearComponent,             // Componente para crear una nueva sucursal
    SucursalListarComponent,            // Componente para listar sucursales existentes
    AlquilerCrearComponent,             // Componente para crear un alquiler
    AlquilerListarComponent,            // Componente para listar todos los alquileres
    AlquilerRevisionComponent,          // Componente para gestionar la revisión de alquileres
    AlquilerCompletadoComponent,        // Componente para mostrar alquileres completados
    FormularioContactoComponent,        // Componente para el formulario de contacto
    Error404Component,                  // Componente para mostrar el error 404 cuando la ruta no se encuentra
    ListarMarcaComponent,               // Componente para listar marcas
    ListarModelosMarcaComponent,        // Componente para listar los modelos por marca
    CrearMarcaComponent,                // Componente para crear una nueva marca
    ListarCategoriaComponent,           // Componente para listar categorías
    ListarCategoriaModeloComponent,     // Componente para listar modelos por categoría
    CrearCategoriaComponent,            // Componente para crear una nueva categoría
    ModificarCategoriaComponent,        // Componente para modificar una categoría existente
    ModificarMarcaComponent,            // Componente para modificar una marca
    AsignarTrabajadoresComponent        // Componente para asignar trabajadores a una sucursal
  ],

  // Importación de otros módulos necesarios para la aplicación
  imports: [
    BrowserModule,                      // Módulo necesario para aplicaciones que corren en el navegador
    CommonModule,                       // Proporciona directivas comunes como ngIf, ngFor
    AppRoutingModule,                   // Módulo para el enrutamiento de la aplicación
    RouterModule,                       // Necesario para utilizar <router-outlet> en los componentes
    ReactiveFormsModule,                // Módulo necesario para formularios reactivos
    FormsModule,                        // Módulo necesario para formularios con ngModel
    BrowserAnimationsModule,            // Habilita animaciones de Angular
    ToastrModule.forRoot(),             // Configura Toastr como el servicio de notificaciones
  ],

  // Proveedores de servicios que estarán disponibles en toda la aplicación
  providers: [
    provideHttpClient(),  // Proveedor para realizar solicitudes HTTP
    CookieService,  // Proveedor para trabajar con cookies
    { provide: LOCALE_ID, useValue: 'es' }  // Configura la aplicación para usar español como el idioma
  ],

  // Componente raíz que arranca la aplicación
  bootstrap: [AppComponent]  // Bootstrap del componente principal (AppComponent)
})
export class AppModule { }  // Definición del módulo principal de la aplicación
