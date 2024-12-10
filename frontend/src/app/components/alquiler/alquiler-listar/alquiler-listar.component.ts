import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlquilerService } from '../../../services/alquiler.service';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { alquiler } from '../../../models/alquiler';
import { usuario } from '../../../models/usuario';
import moment from 'moment';

@Component({
  selector: 'app-alquiler-listar',
  templateUrl: './alquiler-listar.component.html',
  styleUrls: ['./alquiler-listar.component.css']
})

export class AlquilerListarComponent implements OnInit {
  listaAlquileres: alquiler[] = [];
  trabajadores: usuario[] = [];
  campoOrden: string = '';
  direccionOrdenAsc: boolean = true;
  estados = ['reservado', 'activo', 'mantenimiento', 'cancelado', 'completado'];
  modalInstance: any;
  modalTitle: string = '';
  modalPlaceholder: string = '';
  modalType: 'fecha' | 'fechaFinReal' | 'trabajador' | 'estado' | 'notas' = 'fecha';
  modalInput: string | undefined; // Usado solo para tipos distintos a 'fecha' y 'fechaFinReal'
  fechaInput: string = ''; // Usado solo para 'fecha' y 'fechaFinReal'
  horaInput: string = '';  // Usado solo para 'fecha' y 'fechaFinReal'
  alquilerActual: alquiler | null = null;
  fechaValida: boolean = true;
  usuarioLogueado: any;

  constructor(private _alquilerService: AlquilerService, private _authservice: AuthService, private _usuarioService: UsuarioService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.usuarioLogueado = this._authservice.getUsuarioLogueado(); 
    if (!this.usuarioLogueado || this.usuarioLogueado.rol != 'administrador' && this.usuarioLogueado.rol != 'trabajador') {
      window.location.href = '/loginUsuario'; 
    } else {
    this.getAlquileres();
    this.getTrabajadores();
    }
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

    if (tipo === 'fecha' || tipo === 'fechaFinReal') {
      this.modalTitle = tipo === 'fecha' ? 'Establecer Fecha de Inicio Real' : 'Establecer Fecha de Fin Real';
      this.modalPlaceholder = 'Ingrese fecha y hora según los formatos indicados';
      this.fechaInput = '';  // Limpiar la fecha antes de abrir el modal
      this.horaInput = '';   // Limpiar la hora antes de abrir el modal
    } else if (tipo === 'trabajador') {
      this.modalTitle = 'Modificar Trabajador';
      this.modalInput = String(alquiler.trabajadorAsignado?._id) || '';
    } else if (tipo === 'estado') {
      this.modalTitle = 'Cambiar Estado';
      this.modalInput = alquiler.estadoAlquiler || '';
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
    if (this.modalType === 'fecha' || this.modalType === 'fechaFinReal') {
      const regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      const regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/;

      this.fechaValida = regexFecha.test(this.fechaInput) && regexHora.test(this.horaInput);
      return this.fechaValida;
    }

    return typeof this.modalInput === 'string' && this.modalInput.trim() !== '';
  }

  isFechaHoraInput(): boolean {
    return typeof this.modalInput === 'object' && this.modalInput !== null && 'fecha' in this.modalInput && 'hora' in this.modalInput;
  }

  convertirFechaAFormatoISO(fecha: string): string {
    const [dia, mes, anio] = fecha.split('/');
    return `${anio}-${mes}-${dia}`;
  }

  confirmarModal() {
    if (!this.alquilerActual) return;

    if (!this.inputValido()) return;

    if (this.modalType === 'fecha' || this.modalType === 'fechaFinReal') {
      const fechaISO = this.convertirFechaAFormatoISO(this.fechaInput) + ' ' + this.horaInput;
      const fechaCompleta = moment(fechaISO, 'YYYY-MM-DD HH:mm').utcOffset('-03:00').toDate();

      if (this.modalType === 'fecha') {
        this._alquilerService.establecerFechaInicioReal(String(this.alquilerActual._id), fechaCompleta).subscribe(() => {
          this.alquilerActual!.fechaInicioReal = fechaCompleta;
          this.toastr.success('Fecha de Inicio Real actualizada');
          this.modalInstance?.hide();
        });
      } else if (this.modalType === 'fechaFinReal') {
        const fechaInicio = new Date(this.alquilerActual.fechaInicioReal || '');
        if (fechaCompleta <= fechaInicio) {
          this.toastr.warning('La Fecha de Fin Real debe ser mayor a la Fecha de Inicio Real.');
          return;
        }
        this._alquilerService.establecerFechaFinReal(String(this.alquilerActual._id), fechaCompleta).subscribe(() => {
          this.alquilerActual!.fechaFinReal = fechaCompleta;
          this.toastr.success('Fecha de Fin Real actualizada');
          this.modalInstance?.hide();
        });
      }
    } else if (this.modalType === 'trabajador' && typeof this.modalInput === 'string') {
        this._alquilerService.modificarTrabajador(String(this.alquilerActual._id), Number(this.modalInput)).subscribe(() => {
            this._alquilerService.obtenerAlquiler(String(this.alquilerActual!._id)).subscribe(alquilerActualizado => {
              this.alquilerActual!.trabajadorAsignado = alquilerActualizado.trabajadorAsignado;
              this.toastr.success('Trabajador asignado actualizado');
              this.modalInstance?.hide();
            });
        });
    } else if (this.modalType === 'estado' && typeof this.modalInput === 'string') {
        this._alquilerService.cambiarEstado(String(this.alquilerActual._id), this.modalInput).subscribe(() => {
          this.alquilerActual!.estadoAlquiler = String(this.modalInput);

          // Llama a actualizarEstadoAlquilerUsuario para reflejar el cambio en el array de alquileres del usuario
          this._usuarioService.actualizarEstadoAlquilerUsuario(Number(this.alquilerActual?.usuario._id), Number(this.alquilerActual?._id), String(this.modalInput)).subscribe(
            () => {
              console.log('Estado del alquiler actualizado en el usuario');
            },
            error => {
              console.error('Error al actualizar el estado del alquiler en el usuario:', error);
            }
          );

          // Llamada para actualizar el estado del auto después de actualizar el estado del alquiler
          let nuevoEstadoAuto;
          if (this.alquilerActual!.estadoAlquiler === 'completado' || this.alquilerActual!.estadoAlquiler === 'cancelado') {
            nuevoEstadoAuto = 'disponible';
          } else if (this.alquilerActual!.estadoAlquiler === 'activo') {
            nuevoEstadoAuto = 'alquilado';
          } else {
            nuevoEstadoAuto = 'reservado';
          }

          this._alquilerService.actualizarEstadoAuto(String(this.alquilerActual?.auto._id), nuevoEstadoAuto).subscribe(
            () => {
              console.log('Estado del auto actualizado a', nuevoEstadoAuto);
              if (this.alquilerActual!.estadoAlquiler === 'completado') {
                // Si el estado es "completado", actualiza la sucursal del auto a la sucursal de devolución del alquiler
                const sucursalDevolucionId = this.alquilerActual!.sucursalDevolucion._id;
                this._alquilerService.actualizarSucursalAuto(String(this.alquilerActual?.auto._id), String(sucursalDevolucionId)).subscribe(
                  () => {
                    console.log('Sucursal del auto actualizada a la sucursal de devolución:', sucursalDevolucionId);
                  },
                  error => {
                    console.error('Error al actualizar la sucursal del auto:', error);
                  }
                );
              }
            },
            error => {
              console.error('Error al actualizar el estado del auto:', error);
            }
          );

          this.toastr.success('Estado actualizado');
          this.modalInstance?.hide();
        });
    } else if (this.modalType === 'notas' && typeof this.modalInput === 'string') {
        this._alquilerService.modificarNotas(String(this.alquilerActual._id), this.modalInput).subscribe(() => {
          this.alquilerActual!.notas = String(this.modalInput);
          this.toastr.success('Notas actualizadas');
          this.modalInstance?.hide();
        });
    }
  }

}
