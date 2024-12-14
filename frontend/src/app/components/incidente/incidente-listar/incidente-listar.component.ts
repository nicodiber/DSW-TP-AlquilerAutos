import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IncidenteService } from '../../../services/incidente.service';
import { AuthService } from '../../../services/auth.service';
import { incidente } from '../../../models/incidente';

@Component({
  selector: 'app-incidente-listar',
  templateUrl: './incidente-listar.component.html',
  styleUrl: './incidente-listar.component.css'
})
export class IncidenteListarComponent implements OnInit {
  listaIncidentes: incidente[] = [];
  incidenteIdToDelete: any | null = null;

   constructor(private incidenteService: IncidenteService, private _authservice: AuthService,
      private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isNotAdminTrabajador();
    this.getIncidentes();
  }

  isNotAdminTrabajador() {
        this._authservice.getAuthenticatedUser().subscribe(
          (user) => {
            if (user.rol === 'administrador' || user.rol === 'trabajador') {
            } else {
              // Otros roles, patea a login
              window.location.href = '/loginUsuario';
            }
          },
          (error) => {
            window.location.href = '/loginUsuario';
          }
        );
    }

  getIncidentes() {
    this.incidenteService.obtenerIncidentes().subscribe(data => {
      this.listaIncidentes = data;
    }, error => {
      console.log(error);
    })
  }

  abrirDeleteModal(id: any) {
    this.incidenteIdToDelete = id; // Guardamos el ID del usuario a eliminar
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal); // Crear instancia de modal de Bootstrap
      bootstrapModal.show(); // Mostrar el modal
    }
  }

  confirmarDelete() {
    this.incidenteService.eliminarIncidente(this.incidenteIdToDelete).subscribe(
        (data) => {
            this.toastr.success('El incidente fue eliminado con éxito', 'Incidente Eliminado');
            this.getIncidentes();
            const modal = document.getElementById('deleteModal');
            if (modal) {
                const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
                bootstrapModal.hide(); 
            }

            this.incidenteIdToDelete = null;
        },
        (error) => {
            this.toastr.error('Error al eliminar el incidente', 'Error');
            console.log(error);
        }
    );
  }
  
}
