import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Para el toastr
import { ToastrModule } from 'ngx-toastr'; // Para el toastr
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule aquí


// Componentes
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListarModelosComponent } from './components/modelo/modelo-listar/modelo-listar.component';
import { DetallarModeloComponent } from './components/modelo/detalle-modelo/detalle-modelo.component';
import { CrearModeloComponent } from './components/modelo/modelo-crear/modelo-crear.component';
import { LoginPageComponent } from './components/usuario/login-page/login-page.component';
import { TareasAdminComponent } from './components/tareas-admin-trabajador/tareas-admin/tareas-admin.component';
import { TareasTrabajadorComponent } from './components/tareas-admin-trabajador/tareas-trabajador/tareas-trabajador.component';
import { RegisterPageComponent } from './components/usuario/register-page/register-page.component';
import { ListarUsuariosComponent } from './components/usuario/listar-usuarios/listar-usuarios.component';
import { CrearAdminTrabajadorComponent } from './components/usuario/crear-admin-trabajador/crear-admin-trabajador.component';
import { SucursalCrearComponent } from './components/sucursal/sucursal-crear/sucursal-crear.component';
import { SucursalListarComponent } from './components/sucursal/sucursal-listar/sucursal-listar.component';
import { SucursalEditarComponent } from './components/sucursal/sucursal-editar/sucursal-editar.component';
import { SucursalEliminarComponent } from './components/sucursal/sucursal-eliminar/sucursal-eliminar.component';
import { AlquilerCrearComponent } from './components/alquiler/alquiler-crear/alquiler-crear.component';
import { AlquilerEditarComponent } from './components/alquiler/alquiler-editar/alquiler-editar.component';
import { AlquilerEliminarComponent } from './components/alquiler/alquiler-eliminar/alquiler-eliminar.component';
import { AlquilerListarComponent } from './components/alquiler/alquiler-listar/alquiler-listar.component';
import { FormularioContactoComponent } from './components/formulario-contacto/formulario-contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ListarModelosComponent,
    DetallarModeloComponent,
    CrearModeloComponent,
    LoginPageComponent,
    TareasAdminComponent,
    TareasTrabajadorComponent,
    RegisterPageComponent,
    ListarUsuariosComponent,
    CrearAdminTrabajadorComponent,
    SucursalCrearComponent,
    SucursalListarComponent,
    SucursalEditarComponent,
    SucursalEliminarComponent,
    AlquilerCrearComponent,
    AlquilerEditarComponent,
    AlquilerEliminarComponent,
    AlquilerListarComponent,
    FormularioContactoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,  // Para leer el router-outlet
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
