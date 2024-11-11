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
    this.router.navigate(['/loginUsuario']);  // Redirigir al login si no hay usuario
  } else {
    this.usuario = usuarioLogueado;
  }
 }

  irAGestionarUsuarios() {
    this.router.navigate(['/listarUsuarios']);
  }
  irAGestionarSucursales() {
    this.router.navigate(['/sucursal-listar']);
  }
  cerrarSesion() {
    this.authService.logout();  // Llamar al método logout
    this.router.navigate(['/loginUsuario']);  // Redirigir al login después de cerrar sesión
  }
}
