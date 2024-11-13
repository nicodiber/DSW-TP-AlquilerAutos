// tareas-admin.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-tareas-admin',
  templateUrl: './tareas-admin.component.html',
  styleUrls: ['./tareas-admin.component.css']
})
export class TareasAdminComponent implements OnInit {
  usuario: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  const usuarioLogueado = this.authService.getUsuarioLogueado();
  if (!usuarioLogueado) {
    window.location.href = '/loginUsuario';  // Redirigir al login si no hay usuario
  } else {
    this.usuario = usuarioLogueado;
  }
 }

  irAGestionarUsuarios() {
    window.location.href = '/listarUsuarios';
    //this.router.navigate(['/listarUsuarios']);
  }
  irAGestionarSucursales() {
    window.location.href = '/sucursal-listar';    
    //this.router.navigate(['/sucursal-listar']);
  }
  irAGestionarModelos() {
    window.location.href = '/modelos-listar';    
  }
  irAGestionarMarcas() {
    window.location.href = '/';    
  }
  irAGestionarCategorias() {
    window.location.href = '/';    
  }
  irAGestionarAlquileres() {
    window.location.href = '/';    
  }
  editarMisDatos() {
    window.location.href = '/editar-datos-usuario';
    //this.router.navigate(['/loginUsuario']);   Redirigir al login después de cerrar sesión
  }
  cerrarSesion() {
    this.authService.logout(); 
    window.location.href = '/loginUsuario';
    //this.router.navigate(['/loginUsuario']);   Redirigir al login después de cerrar sesión
  }
}
