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

// Componentes
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ListarModelosComponent } from './components/modelo/modelo-listar/modelo-listar.component';
import { DetalleModeloComponent } from './components/modelo/detalle-modelo/detalle-modelo.component';
import { CrearModeloComponent } from './components/modelo/modelo-crear/modelo-crear.component';
import { LoginPageComponent } from './components/usuario/login-page/login-page.component';
import { TareasAdminComponent } from './components/tareas-admin-trabajador/tareas-admin/tareas-admin.component';
import { RegisterPageComponent } from './components/usuario/register-page/register-page.component';
import { ListarUsuariosComponent } from './components/usuario/listar-usuarios/listar-usuarios.component';
import { CrearAdminTrabajadorComponent } from './components/usuario/crear-admin-trabajador/crear-admin-trabajador.component';
import { SucursalCrearComponent } from './components/sucursal/sucursal-crear/sucursal-crear.component';
import { SucursalListarComponent } from './components/sucursal/sucursal-listar/sucursal-listar.component';
import { AlquilerListarComponent } from './components/alquiler/alquiler-listar/alquiler-listar.component';
import { AlquilerRevisionComponent } from './components/alquiler/alquiler-revision/alquiler-revision.component';
import { AlquilerCompletadoComponent } from './components/alquiler/alquiler-completado/alquiler-completado.component';
import { FormularioContactoComponent } from './components/formulario-contacto/formulario-contacto.component';
import { Error404Component } from './components/404/404.component';
import { ListarMarcaComponent } from './components/marca/marca-listar/marca-listar.component';
import { ListarMarcaModeloComponent } from './components/marca/marca-modelo-listar/marca-modelo-listar.component';
import { CrearMarcaComponent } from './components/marca/marca-crear/marca-crear.component';
import { ListarCategoriaComponent } from './components/categoria/categoria-listar/categoria-listar.component';
import { ListarCategoriaModeloComponent } from './components/categoria/categoria-modelo-listar/categoria-modelo-listar.component';
import { CrearCategoriaComponent } from './components/categoria/categoria-crear/categoria-crear.component';
import { AutoListarComponent } from './components/auto/auto-listar/auto-listar.component';
import { AutoCrearComponent } from './components/auto/auto-crear/auto-crear.component';
import { EditarDatosUsuarioComponent } from './components/usuario/editar-datos-usuario/editar-datos-usuario.component';
import { ModelosListarComponent } from './components/modelo/modelos-listar/modelos-listar.component';
import { AsignarTrabajadoresComponent } from './components/sucursal/asignar-trabajadores/asignar-trabajadores.component';             // Componente para asignar trabajadores a sucursales

@NgModule({
  // Declaración de componentes que forman parte del módulo
  declarations: [
    AppComponent,
    LayoutComponent,
    BuscadorComponent,
    ListarModelosComponent,
    DetalleModeloComponent,
    CrearModeloComponent,
    LoginPageComponent,
    TareasAdminComponent,
    RegisterPageComponent,
    ListarUsuariosComponent,
    CrearAdminTrabajadorComponent,
    SucursalCrearComponent,
    SucursalListarComponent,
    AlquilerListarComponent,
    AlquilerRevisionComponent,
    AlquilerCompletadoComponent,
    FormularioContactoComponent,
    Error404Component,
    ListarMarcaComponent,
    ListarMarcaModeloComponent,
    CrearMarcaComponent,
    ListarCategoriaComponent,
    ListarCategoriaModeloComponent,
    CrearCategoriaComponent,
    AutoCrearComponent,
    AutoListarComponent,
    EditarDatosUsuarioComponent,
    ModelosListarComponent,
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
