import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
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
import { ListarCategoriaModeloComponent } from './components/categoria/categoria-modelo-listar/categoria-modelo-listar.component';  // cambiar
import { CrearCategoriaComponent } from './components/categoria/categoria-crear/categoria-crear.component';
import { AutoListarComponent } from './components/auto/auto-listar/auto-listar.component';
import { AutoCrearComponent } from './components/auto/auto-crear/auto-crear.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'modelo-listar', component: ListarModelosComponent },
      { path: 'modelo/:id', component: DetalleModeloComponent },
      { path: 'modelo-crear', component: CrearModeloComponent },
      { path: 'modelo-editar/:id', component: CrearModeloComponent },
      { path: 'loginUsuario', component: LoginPageComponent },
      { path: 'registrar', component: RegisterPageComponent },
      { path: 'contacto', component: FormularioContactoComponent },
      { path: 'alquiler-revision', component: AlquilerRevisionComponent },
      { path: 'alquiler-completado', component: AlquilerCompletadoComponent },
      { path: 'buscador', component: BuscadorComponent },
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
  { path: 'alquiler-listar', component: AlquilerListarComponent },
  { path: 'marca-crear', component:CrearMarcaComponent},
  { path: 'marca-listar', component: ListarMarcaComponent},
  { path: 'marca-editar/:id', component: CrearMarcaComponent },
  { path: 'marca-modelos/:idMarca', component: ListarMarcaModeloComponent},
  { path: 'categoria-listar', component: ListarCategoriaComponent},
  { path: 'categoria-crear', component: CrearCategoriaComponent },
  { path: 'categoria-editar/:id', component: CrearCategoriaComponent },
  { path: 'categoria-modelos/:idCategoria', component: ListarCategoriaModeloComponent},
  { path: 'auto-listar', component: AutoListarComponent },
  { path: 'auto-crear', component:AutoCrearComponent},
  { path: 'auto-editar/:id', component:AutoCrearComponent},
  { path: '**', component: Error404Component } // Para rutas inválidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
