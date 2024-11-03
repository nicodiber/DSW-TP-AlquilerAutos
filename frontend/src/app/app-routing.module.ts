import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
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
import { SucursalListarComponent } from './components/sucursal-listar/sucursal-listar.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'listarModelos', component: ListarModelosComponent },
      { path: 'modelo/:id', component: DetallarModeloComponent },
      { path: 'crearModelo', component: CrearModeloComponent },
      { path: 'editarModelo/:id', component: CrearModeloComponent },
    ]
  },
  { path: 'loginUsuario', component: LoginPageComponent },
  { path: 'registrar', component: RegisterPageComponent },
  { path: 'tareas-admin', component: TareasAdminComponent },
  { path: 'tareas-admin', component: TareasAdminComponent },
  { path: 'listarUsuarios', component: ListarUsuariosComponent },
  { path: 'crearModelo', component: CrearAdminTrabajadorComponent },
  { path: 'crear-admin-trabajador', component: CrearAdminTrabajadorComponent },
  { path: 'editar-admin-trabajador/:id', component: CrearAdminTrabajadorComponent },
  { path: 'sucursal-crear', component: SucursalCrearComponent },
  { path: 'sucursal-listar', component: SucursalListarComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Para rutas inválidas

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
