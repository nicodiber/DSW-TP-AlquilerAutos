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
import { SucursalEditarComponent } from './components/sucursal/sucursal-editar/sucursal-editar.component';
import { SucursalEliminarComponent } from './components/sucursal/sucursal-eliminar/sucursal-eliminar.component';
import { AlquilerCrearComponent } from './components/alquiler/alquiler-crear/alquiler-crear.component';
import { AlquilerListarComponent } from './components/alquiler/alquiler-listar/alquiler-listar.component';
import { AlquilerEditarComponent } from './components/alquiler/alquiler-editar/alquiler-editar.component';
import { AlquilerEliminarComponent } from './components/alquiler/alquiler-eliminar/alquiler-eliminar.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'modelo-listar', component: ListarModelosComponent },
      { path: 'modelo/:id', component: DetallarModeloComponent },
      { path: 'modelo-crear', component: CrearModeloComponent },
      { path: 'modelo-editar/:id', component: CrearModeloComponent },
    ]
  },
  { path: 'loginUsuario', component: LoginPageComponent },
  { path: 'registrar', component: RegisterPageComponent },
  { path: 'tareas-admin', component: TareasAdminComponent },
  { path: 'tareas-admin', component: TareasAdminComponent },
  { path: 'listarUsuarios', component: ListarUsuariosComponent },
  { path: 'crear-modelo', component: CrearAdminTrabajadorComponent },
  { path: 'crear-admin-trabajador', component: CrearAdminTrabajadorComponent },
  { path: 'editar-admin-trabajador/:id', component: CrearAdminTrabajadorComponent },
  { path: 'sucursal-crear', component: SucursalCrearComponent },
  { path: 'sucursal-listar', component: SucursalListarComponent },
  { path: 'sucursal-editar/:id', component: SucursalEditarComponent },
  { path: 'sucursal-eliminar', component: SucursalEliminarComponent },
  { path: 'alquiler-crear', component: AlquilerCrearComponent },
  { path: 'alquiler-listar', component: AlquilerListarComponent },
  { path: 'alquiler-editar/:id', component: AlquilerEditarComponent },
  { path: 'alquiler-eliminar', component: AlquilerEliminarComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Para rutas inválidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
