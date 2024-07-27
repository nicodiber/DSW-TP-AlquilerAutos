import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { ListarConductoresComponent } from './components/listarConductores/listarConductores.component';
import { CrearConductorComponent } from './components/crearConductor/crearConductor.component';

const routes: Routes = [
  {path: '', component: ListarConductoresComponent},
  {path: 'crearConductor', component: CrearConductorComponent},
  {path: 'editarConductor/:id', component: CrearConductorComponent}, //reutilizo codigo de crear xq es similar 
  {path: '**', redirectTo: '', pathMatch: 'full'} //para redireccionar al inicio en caso de q ponga otra ruta 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],    
  exports: [RouterModule]
})
export class AppRoutingModule { }
