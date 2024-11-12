import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlquilerService } from '../../../services/alquiler.service';
import { alquiler } from '../../../models/alquiler';
import { usuario } from '../../../models/usuario';

@Component({
  selector: 'app-alquiler-listar',
  templateUrl: './alquiler-listar.component.html',
  styleUrls: ['./alquiler-listar.component.css']
})
export class AlquilerListarComponent implements OnInit {
  listaAlquileres: alquiler[] = [];
  trabajadores: usuario[] = [];
  // Ordenamiento de columnas
  campoOrden: string = '';
  direccionOrdenAsc: boolean = true;
  // Utilizado para los botones de accion:
  estados = ['reservado', 'activo', 'cancelado', 'completado'];
  modalInstance: any; // Variable para almacenar la instancia del modal
  modalTitle: string = '';
  modalPlaceholder: string = '';
  modalType: 'fecha' | 'fechaFinReal' | 'trabajador' | 'estado' | 'notas' = 'fecha';
  modalInput: any;
  alquilerActual: alquiler | null = null;
  fechaValida: boolean = true;

  constructor(private _alquilerService: AlquilerService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAlquileres();
    this.getTrabajadores();
  }

  getAlquileres() {
    this._alquilerService.obtenerAlquileres().subscribe((data) => {
      this.listaAlquileres = data;
    });
  }

  getTrabajadores() {
    this._alquilerService.obtenerUsuariosPorRol('trabajador').subscribe((trabajadores: usuario[]) => {
      this.trabajadores = trabajadores;
    });
  }

  // Iconos Ordenamiento
  ordenarPor(campo: string) {
    if (this.campoOrden === campo) {
      // Alterna entre ascendente y descendente
      this.direccionOrdenAsc = !this.direccionOrdenAsc;
    } else {
      // Cambia al nuevo campo y establece ascendente
      this.campoOrden = campo;
      this.direccionOrdenAsc = true;
    }

    this.listaAlquileres.sort((a, b) => {
      let valorA = (a as any)[campo];
      let valorB = (b as any)[campo];

      // Si el campo es una fecha, conviértelo a una instancia de Date
      if (campo.includes('fecha')) {
        valorA = new Date(valorA as string).getTime();
        valorB = new Date(valorB as string).getTime();
      }

      if (valorA < valorB) {
        return this.direccionOrdenAsc ? -1 : 1;
      }
      if (valorA > valorB) {
        return this.direccionOrdenAsc ? 1 : -1;
      }
      return 0;
    });
  }

  getIconoOrden(campo: string): string {
      if (this.campoOrden === campo) {
      return this.direccionOrdenAsc ? 'fa fa-chevron-up' : 'fa fa-chevron-down';
    }
    return 'fa fa-chevron-down'; // Mostrar flecha hacia abajo por defecto
  }

  // Funciones que intervienen en los botones de accion
  abrirModal(tipo: 'fecha' | 'fechaFinReal' | 'trabajador' | 'estado' | 'notas', alquiler: alquiler) {
    this.alquilerActual = alquiler;
    this.modalType = tipo;

    if (tipo === 'fecha') {
      this.modalTitle = 'Establecer Fecha de Inicio Real';
      this.modalPlaceholder = 'DD/MM/YYYY';
      this.modalInput = '';
    } else if (tipo === 'fechaFinReal') {
      this.modalTitle = 'Establecer Fecha de Fin Real';
      this.modalPlaceholder = 'DD/MM/YYYY';
      this.modalInput = '';
      if (!alquiler.fechaInicioReal) {
        this.toastr.warning('Debe establecer primero la Fecha de Inicio Real.');
        return;
      }
    } else if (tipo === 'trabajador') {
      this.modalTitle = 'Modificar Trabajador';
      this.modalInput = alquiler.trabajadorAsignado?._id;
    } else if (tipo === 'estado') {
      this.modalTitle = 'Cambiar Estado';
      this.modalInput = alquiler.estadoAlquiler;
    } else if (tipo === 'notas') {
      this.modalTitle = 'Modificar Notas';
      this.modalInput = alquiler.notas || '';
    }

    const modalElement = document.getElementById('dynamicModal');
    if (modalElement) {
      this.modalInstance = new (window as any).bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  inputValido(): boolean {
    // Valida solo el formato para los campos de fecha
    if (this.modalType === 'fecha' || this.modalType === 'fechaFinReal') {
      const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      return regex.test(this.modalInput); // Retorna true solo si el formato es correcto
    }

    // Para otros tipos (trabajador, estado, notas), verifica que el campo no esté vacío
    return this.modalInput !== undefined && this.modalInput !== null && this.modalInput !== '';
  }

  convertirFechaAFormatoISO(fecha: string): string {
    const [dia, mes, anio] = fecha.split('/');
    return `${anio}-${mes}-${dia}`;
  }

  confirmarModal() {
    if (!this.alquilerActual) return;

    if (this.modalType === 'fecha') {
      const fechaISO = this.convertirFechaAFormatoISO(this.modalInput); // Convertir a YYYY-MM-DD para que Mongo lo interprete bien
      this._alquilerService.establecerFechaInicioReal(String(this.alquilerActual._id), fechaISO).subscribe(() => {
        this.alquilerActual!.fechaInicioReal = new Date(fechaISO);
        this.toastr.success('Fecha de Inicio Real actualizada');
        this.modalInstance?.hide(); // Cierra el modal
      });
    } else if (this.modalType === 'fechaFinReal') {
      const fechaISO = this.convertirFechaAFormatoISO(this.modalInput);
      const fechaInicio = new Date(this.alquilerActual.fechaInicioReal || '');
      const fechaFin = new Date(fechaISO);
      if (fechaFin <= fechaInicio) {
        this.toastr.warning('La Fecha de Fin Real debe ser mayor a la Fecha de Inicio Real.');
        return;
      }

      this._alquilerService.establecerFechaFinReal(String(this.alquilerActual._id), fechaISO).subscribe(() => {
        this.alquilerActual!.fechaFinReal = fechaFin;
        this.toastr.success('Fecha de Fin Real actualizada');
        this.modalInstance?.hide();
      });
    } else if (this.modalType === 'trabajador') {
        this._alquilerService.modificarTrabajador(String(this.alquilerActual._id), this.modalInput).subscribe(() => {
          this._alquilerService.obtenerAlquiler(String(this.alquilerActual!._id)).subscribe(alquilerActualizado => {
            this.alquilerActual!.trabajadorAsignado = alquilerActualizado.trabajadorAsignado;
            this.toastr.success('Trabajador asignado actualizado');
            this.modalInstance?.hide();
          });
        });
    } else if (this.modalType === 'estado') {
      this._alquilerService.cambiarEstado(String(this.alquilerActual._id), this.modalInput).subscribe(() => {
        this.alquilerActual!.estadoAlquiler = this.modalInput;
        this.toastr.success('Estado actualizado');
        this.modalInstance?.hide();
      });
    } else if (this.modalType === 'notas') {
      this._alquilerService.modificarNotas(String(this.alquilerActual._id), this.modalInput).subscribe(() => {
        this.alquilerActual!.notas = this.modalInput;
        this.toastr.success('Notas actualizadas');
        this.modalInstance?.hide();
      });
    }
  }
}
