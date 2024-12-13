import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlquilerService } from '../../../services/alquiler.service';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { incidente } from '../../../models/incidente';

@Component({
  selector: 'app-incidentes-usuario',
  templateUrl: './incidentes-usuario.component.html',
  styleUrl: './incidentes-usuario.component.css'
})
export class IncidentesUsuarioComponent implements OnInit {
  usuario: any;
  incidentes: any
  alquilerIdToCancel: any | null = null;
  
    constructor(private authService: AuthService,
                private alquilerService: AlquilerService, 
                private usuarioService: UsuarioService, 
                private router: Router,
                private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerUsuarioSesion();
  }




obtenerUsuarioSesion(){
  this.authService.getAuthenticatedUser().subscribe({
    next: (usuario) => {
      if (usuario) {
        this.usuario = usuario;
        if (usuario.rol === 'usuario') {
          this.getIncidentes();
        }
      } else {
        window.location.href = '/loginUsuario';
      }
    },
    error: () => {
      window.location.href = '/loginUsuario';
    },
  });
  }


  editarMisDatos() {
    window.location.href = '/editar-datos-usuario';
  }

  cerrarSesion() {
    this.authService.logout().subscribe({
    next: () => {
      window.location.href = '/loginUsuario';
    },
    error: (err) => {
      console.error('Error al cerrar sesión:', err);
    }
    });
  } 

  getIncidentes(){
    this.authService.obtenerAlquileresLogueado(this.usuario._id).subscribe({
      next: (alquileresDeUser) => {
        this.usuario = alquileresDeUser;
          this.authService.obtenerIncidentesDelAlquilerLogueado(alquileresDeUser._id).subscribe({
              next: (incidentesDelAlquiler) => {
                this.usuario = incidentesDelAlquiler;
                },
                error: (error) => {
                console.error('Error al obtener los incidentes de los alquileres:', error);
              }
            });
        },
      error: (error) => {
        console.error('Error al obtener alquileres:', error);
      }
    });
  }

  abrirPagarIncidenteModal(incidentes: any){
    return incidentes;
  }
  }