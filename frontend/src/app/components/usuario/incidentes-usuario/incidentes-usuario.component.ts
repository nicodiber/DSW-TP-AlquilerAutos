import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlquilerService } from '../../../services/alquiler.service';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { incidente } from '../../../models/incidente';
import { IncidenteService } from '../../../services/incidente.service';

@Component({
  selector: 'app-incidentes-usuario',
  templateUrl: './incidentes-usuario.component.html',
  styleUrl: './incidentes-usuario.component.css'
})
export class IncidentesUsuarioComponent implements OnInit {
  usuario: any;
  incidentes: any
  IncidenteIdToCancel: any | null = null;
  
    constructor(private authService: AuthService,
                private alquilerService: AlquilerService,
                private incidenteService: IncidenteService,  
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

  getIncidentes(): void {
  this.incidenteService.obtenerIncidentesUsuario(this.usuario._id).subscribe({
    next: (incidentes) => {
      this.incidentes = incidentes; // Almacena los incidentes obtenidos
      console.log('Incidentes del usuario:', incidentes);
    },
    error: (error) => {
      console.error('Error al obtener incidentes del usuario:', error);
    }
  });
}


  
  abrirPagarIncidenteModal(id: any) {
    this.IncidenteIdToCancel = id; // Guardamos el ID del usuario a eliminar
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal); // Crear instancia de modal de Bootstrap
      bootstrapModal.show(); // Mostrar el modal
    }
  }

  confirmarPago() {

    this.incidenteService.pagarIncidente(this.IncidenteIdToCancel).subscribe(
        (data) => {
            this.toastr.success('El Incidente fue pagado con éxito', 'Incidente Pagado');
              this.getIncidentes();
            const modal = document.getElementById('deleteModal');
            if (modal) {
                const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
                bootstrapModal.hide(); 
            }

            this.IncidenteIdToCancel = null;
        },
        (error) => {
            this.toastr.error('Error al pagar el incidente', 'Error');
            console.log(error);
        }
    );
  }
}