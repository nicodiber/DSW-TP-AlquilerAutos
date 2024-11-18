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
      this.getAlquileres();
    };
      
  }
 
  getAlquileres() {
    this.authService.obtenerAlquileresLogueado(this.usuario._id).subscribe({
      next: (alquileresDeUser) => {
        
        this.usuario = alquileresDeUser;
      },
      error: (error) => {
        console.error('Error al obtener alquileres:', error);
      }
    });
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
    window.location.href = '/marca-listar';    
  }
  irAGestionarCategorias() {
    window.location.href = '/categoria-listar';    
  }
  irAGestionarAlquileres() {
    window.location.href = '/alquiler-listar';    
  }
  irAGestionarAutos() {
    window.location.href = '/auto-listar';    
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
