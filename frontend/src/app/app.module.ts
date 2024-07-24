import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //esto es del toastr (ya agreado tamb en angular.json en styles)
import { ToastrModule } from 'ngx-toastr'; //esto es del toastr (ya agreado tamb en angular.json en styles)
import { provideHttpClient } from '@angular/common/http';  //para poder hacer las peticiones http desde el front al back
//queria usar httpclientModule, pero en angular18 no esta mas asi q se reemplaza por provideHttpClient

//componentes
import { AppComponent } from './app.component';
import { ListarConductoresComponent } from './components/listar-conductores/listar-conductores.component';
import { CrearConductorComponent } from './components/crear-conductor/crear-conductor.component';


@NgModule({
  declarations: [
    AppComponent,
    ListarConductoresComponent,
    CrearConductorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
