import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { ListarConductoresComponent } from './components/listar-conductores/listar-conductores.component';
import { CrearConductorComponent } from './components/crear-conductor/crear-conductor.component';

const routes: Routes = [
  {path: '', component: ListarConductoresComponent},
  {path: 'crear-conductor', component: CrearConductorComponent},
  {path: 'editar-conductor/:id', component: CrearConductorComponent}, //reutilizo codigo de crear xq es similar 
  {path: '**', redirectTo: '', pathMatch: 'full'} //para redireccionar al inicio en caso de q ponga otra ruta 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],    
  exports: [RouterModule]
})
export class AppRoutingModule { }
