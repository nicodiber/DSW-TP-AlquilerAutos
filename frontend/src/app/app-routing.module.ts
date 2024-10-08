import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LayoutComponent } from './components/layout/layout.component';
import { ListarModelosComponent } from './components/listarModelos/listarModelos.component';
import { DetallarModeloComponent } from './components/detallarModelo/detallarModelo.component';
import { CrearModeloComponent } from './components/crearModelo/crearModelo.component';

const routes: Routes = [ 
  { path: '', component: LayoutComponent, children: [
    { path: 'listarModelos', component: ListarModelosComponent },
    { path: 'modelo/:id', component: DetallarModeloComponent },
    { path: 'crearModelo', component: CrearModeloComponent },
    { path: 'editarModelo/:id', component: CrearModeloComponent }
  ]},

  { path: '**', redirectTo: '', pathMatch: 'full' } // Para rutas inválidas

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],    
  exports: [RouterModule]
})
export class AppRoutingModule { }
