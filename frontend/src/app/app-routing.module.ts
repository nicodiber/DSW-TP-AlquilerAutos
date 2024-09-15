import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListarConductoresComponent } from './components/listarConductores/listarConductores.component';
import { CrearConductorComponent } from './components/crearConductor/crearConductor.component';

import { ListarModelosComponent } from './components/listarModelos/listarModelos.component';
import { DetallarModeloComponent } from './components/detallarModelo/detallarModelo.component';
import { CrearModeloComponent } from './components/crearModelo/crearModelo.component';

const routes: Routes = [ 
  { path: 'listarModelos', component: ListarModelosComponent },
  { path: 'modelo/:id', component: DetallarModeloComponent },
  { path: 'crearModelo', component: CrearModeloComponent },
  { path: 'editarModelo:id', component: CrearModeloComponent },

  { path: 'listarConductores', component: ListarConductoresComponent },
  { path: 'crearConductor', component: CrearConductorComponent },
  { path: 'editarConductor/:id', component: CrearConductorComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' } // Para rutas inválidas

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],    
  exports: [RouterModule]
})
export class AppRoutingModule { }
