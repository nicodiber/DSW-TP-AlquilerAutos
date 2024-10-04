import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //esto es del toastr (ya agreado tamb en angular.json en styles)
import { ToastrModule } from 'ngx-toastr'; //esto es del toastr (ya agreado tamb en angular.json en styles)
import { provideHttpClient } from '@angular/common/http';  //para poder hacer las peticiones http desde el front al back
// Ibamos a usar httpclientModule, pero en angular18 no esta mas asi q se reemplaza por provideHttpClient

// Componentes
import { AppComponent } from './app.component';

import { ListarModelosComponent } from './components/listarModelos/listarModelos.component';
import { DetallarModeloComponent } from './components/detallarModelo/detallarModelo.component';
import { CrearModeloComponent } from './components/crearModelo/crearModelo.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    ListarModelosComponent,
    DetallarModeloComponent,
    CrearModeloComponent,
    AdminMenuComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
