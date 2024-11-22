import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModeloService } from '../../../services/modelo.service';
import { modelo } from '../../../models/modelo';
import { AuthService } from '../../../services/auth.service';
 
@Component({
  selector: 'app-modelos-listar',
  templateUrl: './modelos-listar.component.html',
  styleUrls: ['./modelos-listar.component.css']
})
export class ModelosListarComponent implements OnInit {
  listaModelos: modelo[] = [];
  usuarioLogueado: any;
  modeloIdToDelete: any | null = null; // Aquí guardamos el id del modelo a eliminar

  constructor(private _modeloService: ModeloService, private _authservice: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.usuarioLogueado = this._authservice.getUsuarioLogueado(); 
    if (!this.usuarioLogueado) {
      window.location.href = '/loginUsuario'; 
    } else {
      this.getModelos(); 
    }
  }

  getModelos() {
    this._modeloService.obtenerModelos().subscribe(
      data => {
        this.listaModelos = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  abrirDeleteModal(id: any) {
    this.modeloIdToDelete = id; // se guarda el id del modelo a eliminar
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal); 
      bootstrapModal.show(); 
    }
  }

  confirmarDelete() {
  const modeloId = this.modeloIdToDelete;  // almacenamos el id en una variable local

  if (!modeloId) {            // Esto es una verificacion, Nunca pasa por aca pero no borrar 
    this.toastr.error('No se ha asignado un modelo para eliminar', 'Error');
    return;
  }

  this._modeloService.verificarAutosPorModelo(modeloId).subscribe({
    next: (existenAutos) => {
      if (existenAutos) {
        this.toastr.error('No se puede eliminar este modelo porque tiene autos asociados', 'Error');
      } else {
        this._modeloService.eliminarModelo(modeloId).subscribe({
          next: () => {
            this.toastr.success('El modelo fue eliminado con éxito', 'Modelo Eliminado');
            this.getModelos();
          },
          error: (err) => {
            console.error('Error al eliminar Modelo:', err);
            this.toastr.error('Error inesperado al eliminar el modelo', 'Error');
          }
        });
      }
    },
    error: (err) => {
      console.error('Error al verificar Autos por Modelo:', err);
      this.toastr.error('Error al verificar si el modelo tiene autos asociados', 'Error');
    }
  });

  // Cierra el modal manualmente después de eliminar
  const modal = document.getElementById('deleteModal');
  if (modal) {
    const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
  }
  this.modeloIdToDelete = null;  // Reinicia el id del modelo
}


}
