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
import { ListarModelosComponent } from './components/listarModelos/listarModelos.component';
import { DetallarModeloComponent } from './components/detallarModelo/detallarModelo.component';
import { CrearModeloComponent } from './components/crearModelo/crearModelo.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TareasAdminComponent } from './components/usuario/tareas-admin/tareas-admin.component';
import { TareasTrabajadorComponent } from './components/usuario/tareas-trabajador/tareas-trabajador.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { CrearAdminTrabajadorComponent } from './components/crear-admin-trabajador/crear-admin-trabajador.component';
import { SucursalCrearComponent } from './components/sucursal-crear/sucursal-crear.component';

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
