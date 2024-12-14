import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { AuthService } from '../../../services/auth.service';
import { mantenimiento } from '../../../models/mantenimiento';
import { usuario } from '../../../models/usuario';
import moment from 'moment';
import { AlquilerService } from '../../../services/alquiler.service';

@Component({
  selector: 'app-mantenimiento-listar',
  templateUrl: './mantenimiento-listar.component.html',
  styleUrls: ['./mantenimiento-listar.component.css']
})
export class MantenimientoListarComponent implements OnInit {
  listaMantenimientos: mantenimiento[] = [];
  trabajadores: usuario[] = [];
  campoOrden: string = '';
  direccionOrdenAsc: boolean = true;
  modalInstance: any;
  modalTitle: string = '';
  modalPlaceholder: string = '';
  modalType: 'fechaFinMantenimiento' | 'trabajador' | 'costo' | 'descripcion' = 'fechaFinMantenimiento';
  modalInput: string | undefined;
  fechaInput: string = '';
  horaInput: string = '';
  fechaISO: string = '';
  mantenimientoActual: mantenimiento | null = null;
  fechaValida: boolean = true;
  usuarioLogueado: any;

  constructor(
    private _mantenimientoService: MantenimientoService,
    private _authservice: AuthService,
    private _alquilerService: AlquilerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isNotAdminTrabajador();
    this.getMantenimientos();
  }

  isNotAdminTrabajador() {
    this._authservice.getAuthenticatedUser().subscribe(
      (usuarioLogueado) => {
        this.usuarioLogueado = this.usuarioLogueado || {};
        if (usuarioLogueado.rol === 'administrador') {
          this.usuarioLogueado.rol = 'administrador';
        } else if (usuarioLogueado.rol === 'trabajador') {
          this.usuarioLogueado.rol = 'trabajador';
        } else {
          window.location.href = '/loginUsuario';
        }
      },
      () => {
        window.location.href = '/loginUsuario';
      }
    );
  }

  getMantenimientos() {
    this._mantenimientoService.obtenerMantenimientos().subscribe((data) => {
      this.listaMantenimientos = data;
    });
  }

  ordenarPor(campo: string) {
    if (this.campoOrden === campo) {
      this.direccionOrdenAsc = !this.direccionOrdenAsc;
    } else {
      this.campoOrden = campo;
      this.direccionOrdenAsc = true;
    }

    this.listaMantenimientos.sort((a, b) => {
      let valorA = (a as any)[campo];
      let valorB = (b as any)[campo];

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
    return 'fa fa-chevron-down';
  }

  abrirModal(tipo: 'fechaFinMantenimiento' | 'trabajador' | 'costo' | 'descripcion', mantenimiento: mantenimiento) {
    this.mantenimientoActual = mantenimiento;
    this.modalType = tipo;

    if (tipo === 'fechaFinMantenimiento') {
      this.modalTitle = 'Modificar fecha Fin Mantenimiento';
      this.modalPlaceholder = 'Ingrese fecha y hora según los formatos indicados';
      this.fechaInput = '';
      this.horaInput = '';
    } else if (tipo === 'trabajador') {
      this.modalTitle = 'Asignar Trabajador';
      this._alquilerService.obtenerTrabajadoresPorSucursal(String(this.mantenimientoActual.auto.sucursalAuto)).subscribe((trabajadores: usuario[]) => {
        this.trabajadores = trabajadores;
        console.log(this.mantenimientoActual?.auto.sucursalAuto);
        console.log('Trabajadores cargados:', trabajadores); // Verifica si los trabajadores se están cargando
      },
        error => {
          console.error('Error al cargar los trabajadores:', error);
        }
      );
      this.modalInput = String(mantenimiento.trabajadorACargo?._id) || '';
    } else if (tipo === 'descripcion') {
      this.modalTitle = 'Modificar Descripcion';
      this.modalInput = mantenimiento.descripcion || '';
    }
    else if (tipo === 'costo') {
      this.modalTitle = 'Asignar Costo';
      this.modalInput = String(mantenimiento.costoMantenimiento || '');
    }

    const modalElement = document.getElementById('dynamicModal');
    if (modalElement) {
      this.modalInstance = new (window as any).bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  convertirFecha() {
    if (this.fechaISO) {
      const partes = this.fechaISO.split('-');
      this.fechaInput = `${partes[2]}/${partes[1]}/${partes[0]}`;
    } else {
      this.fechaInput = '';
    }
  }

  inputValido(): boolean {
    if (this.modalType === 'fechaFinMantenimiento') {
      this.fechaValida = !!this.fechaISO;
      return this.fechaValida;
    }

    return typeof this.modalInput === 'string' && this.modalInput.trim() !== '';
  }

  convertirFechaAFormatoISO(fecha: string): string {
    const [dia, mes, anio] = fecha.split('/');
    return `${anio}-${mes}-${dia}`;
  }

  confirmarModal() {
    // Validación inicial: aseguramos que hay un mantenimiento seleccionado y la entrada es válida
    if (!this.mantenimientoActual || !this.inputValido()) {
      this.toastr.warning('Entrada no válida o mantenimiento no seleccionado.');
      return;
    }

    if (this.modalType === 'fechaFinMantenimiento') {
      const fechaISO = this.convertirFechaAFormatoISO(this.fechaInput) + ' ' + this.horaInput;
      const fechaCompleta = moment(fechaISO, 'YYYY-MM-DD HH:mm').utcOffset('-03:00').toDate();
      const fechaInicio = new Date(this.mantenimientoActual.fechaInicioMantenimiento || '');
      if (fechaCompleta <= fechaInicio) {
        this.toastr.warning('La Fecha de Fin Real debe ser mayor a la Fecha de Inicio Real.');
        return;
      }

      this._mantenimientoService.establecerFechaFinMantenimiento(String(this.mantenimientoActual._id), fechaCompleta).subscribe(() => {
        this.mantenimientoActual!.fechaFinMantenimiento = fechaCompleta;

        // Actualizar el estado del Auto
        this._mantenimientoService.actualizarEstadoAuto(String(this.mantenimientoActual?.auto._id)).subscribe(
          () => {
            console.log('Estado del auto actualizado');
          },
          error => {
            console.error('Error al actualizar el estado del auto:', error);
            this.toastr.error('Error al actualizar el estado del auto');
          }
        );

        this.toastr.success('Fecha de Fin de mantenimiento actualizada');
        this.modalInstance?.hide();
      });

    } else if (this.modalType === 'trabajador' && typeof this.modalInput === 'string') {
      const trabajadorId = parseInt(this.modalInput, 10); // Convierte el ID a número
      if (isNaN(trabajadorId)) {
        this.toastr.error('Error: Selección de trabajador inválida.');
        return;
      }
      this._mantenimientoService.modificarTrabajador(String(this.mantenimientoActual._id), Number(this.modalInput)).subscribe(() => {
        this._mantenimientoService.obtenerMantenimiento(String(this.mantenimientoActual!._id)).subscribe((mantenimientoActualizado) => {
          this.mantenimientoActual!.trabajadorACargo = mantenimientoActualizado.trabajadorACargo;
          this.toastr.success('Trabajador a cargo asignado correctamente');
          this.modalInstance?.hide();
        });
      });
    }
    if (this.modalType === 'costo' && typeof this.modalInput === 'string') {
      const costo = parseFloat(this.modalInput);  // Convierte la cadena a número
      if (isNaN(costo)) {
        this.toastr.error('Error: El costo debe ser un número válido.');
        return;
      }
      this._mantenimientoService.modificarCosto(String(this.mantenimientoActual._id), costo).subscribe(() => {
        this.mantenimientoActual!.costoMantenimiento = costo;  // Asigna el valor numérico
        this.toastr.success('Costo actualizado');
        this.modalInstance?.hide();
      });
    }

    else if (this.modalType === 'descripcion' && typeof this.modalInput === 'string') {
      this._mantenimientoService.modificarDescripcion(String(this.mantenimientoActual._id), this.modalInput).subscribe(() => {
        this.mantenimientoActual!.descripcion = this.modalInput;
        this.toastr.success('Descripcion actualizada');
        this.modalInstance?.hide();
      });
    }
  }
}
