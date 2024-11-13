import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Para ciertos atributos como ngModule, ngModel, ngModelOptions, entre otros
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Para el toastr
import { ToastrModule } from 'ngx-toastr'; // Para el toastr
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule aquí
import { CookieService } from 'ngx-cookie-service'; // Cookies

// Cambiar la fechas a formato español
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

// Componentes
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    BuscadorComponent,
    ListarModelosComponent,
    DetalleModeloComponent,
    CrearModeloComponent,
    LoginPageComponent,
    TareasAdminComponent,
    TareasTrabajadorComponent,
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
    AutoListarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,  // Para leer el router-outlet
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideHttpClient(), CookieService, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
