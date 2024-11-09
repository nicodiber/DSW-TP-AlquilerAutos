import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
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
import { AlquilerCrearComponent } from './components/alquiler/alquiler-crear/alquiler-crear.component';
import { AlquilerListarComponent } from './components/alquiler/alquiler-listar/alquiler-listar.component';
import { FormularioContactoComponent } from './components/formulario-contacto/formulario-contacto.component';
import { Error404Component } from './components/404/404.component';
import { MarcaListarComponent } from './components/marca/marca-listar/marca-listar.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'modelo-listar', component: ListarModelosComponent },
      { path: 'modelo/:id', component: DetallarModeloComponent },
      { path: 'modelo-crear', component: CrearModeloComponent },
      { path: 'modelo-editar/:id', component: CrearModeloComponent },
      { path: 'loginUsuario', component: LoginPageComponent },
      { path: 'registrar', component: RegisterPageComponent },
      { path: 'contacto', component: FormularioContactoComponent },
    ]
  },
  

  { path: 'tareas-admin', component: TareasAdminComponent },
  { path: 'listarUsuarios', component: ListarUsuariosComponent },
  { path: 'crear-admin-trabajador', component: CrearAdminTrabajadorComponent },
  { path: 'editar-admin-trabajador/:id', component: CrearAdminTrabajadorComponent },
  { path: 'sucursal-crear', component: SucursalCrearComponent },
  { path: 'sucursal-listar', component: SucursalListarComponent },
  { path: 'sucursal-editar/:id', component: SucursalCrearComponent },
  { path: 'sucursal-eliminar', component: SucursalCrearComponent },
  { path: 'alquiler-crear', component: AlquilerCrearComponent },
  { path: 'alquiler-listar', component: AlquilerListarComponent },
  { path: 'alquiler-editar/:id', component: AlquilerCrearComponent },
  { path: 'alquiler-eliminar', component: AlquilerCrearComponent },
  { path: 'marcas', component: MarcaListarComponent},
  { path: '**', component: Error404Component } // Para rutas inválidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
