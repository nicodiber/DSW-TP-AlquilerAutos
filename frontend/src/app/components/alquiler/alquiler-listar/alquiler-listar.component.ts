import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { alquiler } from '../../../models/alquiler';
import { AlquilerService } from '../../../services/alquiler.service';

@Component({
  selector: 'app-alquiler-listar',
  templateUrl: './alquiler-listar.component.html',
  styleUrls: ['./alquiler-listar.component.css']
})
export class AlquilerListarComponent implements OnInit {
  listaAlquileres: alquiler[] = [];
  mostrarDetalles?: boolean = false;

  constructor(
    private _alquilerService: AlquilerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAlquileres();
  }

  getAlquileres() {
    this._alquilerService.obtenerAlquileres().subscribe(
      (data) => {
        console.log(data); 
        this.listaAlquileres = data; // 'data' ya debería tener los datos completos debido al 'populate' en el backend
      },
      (error) => {
        console.log(error);
      }
    );
  }

  establecerFechaInicioReal(alquiler: alquiler) {
    const nuevaFecha = prompt('Ingrese la nueva Fecha de Inicio Real (YYYY-MM-DD)');
    if (nuevaFecha) {
      this._alquilerService.establecerFechaInicioReal(String(alquiler._id), nuevaFecha).subscribe(
        (response) => {
          this.toastr.success('Fecha de Inicio Real actualizada');
          alquiler.fechaInicioReal = new Date(nuevaFecha);
        },
        (error) => {
          this.toastr.error('Error al actualizar la fecha');
        }
      );
    }
  }

  establecerFechaFinReal(alquiler: alquiler) {
    const nuevaFecha = prompt('Ingrese la nueva Fecha de Fin Real (YYYY-MM-DD)');
    if (nuevaFecha) {
      this._alquilerService.establecerFechaFinReal(String(alquiler._id), nuevaFecha).subscribe(
        (response) => {
          this.toastr.success('Fecha de Fin Real actualizada');
          alquiler.fechaFinReal = new Date(nuevaFecha);
        },
        (error) => {
          this.toastr.error('Error al actualizar la fecha');
        }
      );
    }
  }

  modificarNotas(alquiler: alquiler) {
    const nuevasNotas = prompt('Ingrese las nuevas notas');
    if (nuevasNotas !== null) {
      this._alquilerService.modificarNotas(String(alquiler._id), nuevasNotas).subscribe(
        (response) => {
          this.toastr.success('Notas actualizadas');
          alquiler.notas = nuevasNotas;
        },
        (error) => {
          this.toastr.error('Error al actualizar las notas');
        }
      );
    }
  }

  modificarTrabajador(alquiler: alquiler) {
    const nuevoTrabajadorId = prompt('Ingrese el ID del nuevo trabajador');
    if (nuevoTrabajadorId) {
      this._alquilerService.obtenerTrabajadorPorId(Number(nuevoTrabajadorId)).subscribe(
        (trabajador) => {
          if (alquiler._id && trabajador._id) { // Verificamos que ambos IDs estén definidos
            this._alquilerService.modificarTrabajador(String(alquiler._id), trabajador._id).subscribe(
              (response) => {
                this.toastr.success('Trabajador asignado actualizado');
                alquiler.trabajadorAsignado = trabajador; // Asigna el objeto trabajador completo
              },
              (error) => {
                this.toastr.error('Error al actualizar el trabajador');
              }
            );
          } else {
            this.toastr.error('No se puede asignar trabajador: faltan IDs');
          }
        },
        (error) => {
          this.toastr.error('Error al obtener los datos del trabajador');
        }
      );
    }
  }

  cambiarEstado(alquiler: alquiler) {
    const nuevoEstado = prompt('Ingrese el nuevo estado');
    if (nuevoEstado) {
      this._alquilerService.cambiarEstado(String(alquiler._id), nuevoEstado).subscribe(
        (response) => {
          this.toastr.success('Estado actualizado');
          alquiler.estadoAlquiler = nuevoEstado;
        },
        (error) => {
          this.toastr.error('Error al actualizar el estado');
        }
      );
    }
  }

}
