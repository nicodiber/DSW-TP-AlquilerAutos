import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlquilerService } from '../../../services/alquiler.service';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { MantenimientoService } from '../../../services/mantenimiento.service';
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
  modalInstance: any;
  modalTitle: string = '';
  modalPlaceholder: string = '';
  modalType: 'fecha' | 'fechaFinReal' | 'trabajador' | 'cancelacion' | 'notas' = 'fecha';
  modalInput: string | undefined; // Usado solo para tipos distintos a 'fecha' y 'fechaFinReal'
  fechaInput: string = ''; // Usado solo para 'fecha' y 'fechaFinReal'
  horaInput: string = '';  // Usado solo para 'fecha' y 'fechaFinReal'
  fechaISO: string = '';   // Fecha en formato ISO (YYYY-MM-DD)
  alquilerActual: alquiler | null = null;
  fechaValida: boolean = true;
  usuarioLogueado: any;

  constructor(private _alquilerService: AlquilerService, private _mantenimientoService: MantenimientoService, private _authservice: AuthService, private _usuarioService: UsuarioService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.isNotAdminTrabajador();
    this.getAlquileres();
    this._mantenimientoService.obtenerMantenimientos();
  }

  isNotAdminTrabajador() {
    this._authservice.getAuthenticatedUser().subscribe(
      (usuarioLogueado) => {
        this.usuarioLogueado = this.usuarioLogueado || {};
        // Si el rol es admin o trabajador, se permite el acceso
        if (usuarioLogueado.rol === 'administrador') {
          this.usuarioLogueado.rol = 'administrador';
        } else if (usuarioLogueado.rol === 'trabajador') {
          this.usuarioLogueado.rol = 'trabajador';
        } 
        // Otros roles, patea a login
        else {
          window.location.href = '/loginUsuario';
        }
      },
      (error) => {
        window.location.href = '/loginUsuario';
      }
    );
  }

  getAlquileres() {
    this._alquilerService.obtenerAlquileres().subscribe((data) => {
      this.listaAlquileres = data;
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
  abrirModal(tipo: 'fecha' | 'fechaFinReal' | 'trabajador' | 'cancelacion' | 'notas', alquiler: alquiler) {
    this.alquilerActual = alquiler;
    this.modalType = tipo;

    if (tipo === 'fecha' || tipo === 'fechaFinReal') {
      if (this.alquilerActual.trabajadorAsignado == null){
        this.toastr.warning('Por favor, establezca un trabajador asignado.');
        return; // Detener la ejecución antes de intentar abrir el modal
      } else if ((tipo === 'fechaFinReal') && (this.alquilerActual.fechaInicioReal == null)) { 
        this.toastr.warning('Por favor, establezca primero la Fecha de Inicio Real.');
        return; // Detener la ejecución antes de intentar abrir el modal
      } else {
        this.modalTitle = tipo === 'fecha' ? 'Establecer Fecha de Inicio Real' : 'Establecer Fecha de Fin Real';
        this.modalPlaceholder = 'Ingrese fecha y hora según los formatos indicados';
        this.fechaInput = '';  // Limpiar la fecha antes de abrir el modal
        this.horaInput = '';   // Limpiar la hora antes de abrir el modal
      }
    } else if (tipo === 'trabajador') {
      this.modalTitle = 'Modificar Trabajador';
      this._alquilerService.obtenerTrabajadoresPorSucursal(String(this.alquilerActual.sucursalEntrega._id)).subscribe((trabajadores: usuario[]) => {
        this.trabajadores = trabajadores;
      });
      this.modalInput = String(alquiler.trabajadorAsignado?._id) || '';
    } else if (tipo === 'cancelacion') {
      this.modalTitle = 'Cancelar Alquiler';
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

  convertirFecha() {
    if (this.fechaISO) {
      const partes = this.fechaISO.split('-'); // Separar año, mes, día
      this.fechaInput = `${partes[2]}/${partes[1]}/${partes[0]}`; // DD/MM/YYYY
    } else {
      this.fechaInput = '';
    }
  }

  // Validar la fecha (en este caso, siempre válida si se usa el selector de fecha)
  inputValido(): boolean {
    if (this.modalType === 'fecha' || this.modalType === 'fechaFinReal') {
      this.fechaValida = !!this.fechaISO; // Validar que se seleccionó una fecha
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
          this._alquilerService.cambiarEstado(String(this.alquilerActual?._id), 'activo').subscribe(() => {
            // Actualizar el estado del Alquiler
            this.alquilerActual!.estadoAlquiler = 'activo';
            // Actualizar el estado del Alquiler en el array de alquileres del usuario
            this._usuarioService.actualizarEstadoAlquilerUsuario(Number(this.alquilerActual?.usuario._id), Number(this.alquilerActual?._id), 'activo').subscribe(
              () => {
                console.log('Alquiler actualizado con éxito');
              },
              error => {
                console.error('Error al actualizar el alquiler en el usuario:', error);
              }
            );
            // Actualizar el estado del Auto
            this._alquilerService.actualizarEstadoAuto(String(this.alquilerActual?._id), String(this.alquilerActual?.auto._id), 'alquilado').subscribe(
              () => {
                console.log('Estado del auto actualizado');
              },
              error => {
                console.error('Error al actualizar el estado del auto:', error);
              }
            );
            this.fechaISO = ''; // Reseteo la fecha para que no me aparezca después por defecto al establecer la fechaFinReal
            this.toastr.success('Fecha de Inicio Real actualizada');
            this.modalInstance?.hide();
          });
        });
      } else if (this.modalType === 'fechaFinReal') {
        const fechaInicio = new Date(this.alquilerActual.fechaInicioReal || '');
        if (fechaCompleta <= fechaInicio) {
          this.toastr.warning('La Fecha de Fin Real debe ser mayor a la Fecha de Inicio Real.');
          return;
        }
        this._alquilerService.establecerFechaFinReal(String(this.alquilerActual._id), fechaCompleta).subscribe(() => {
          this.alquilerActual!.fechaFinReal = fechaCompleta;
          this._alquilerService.cambiarEstado(String(this.alquilerActual?._id), 'completado').subscribe(() => {
            // Actualizar el estado del Alquiler
            this.alquilerActual!.estadoAlquiler = 'completado';
            // Actualizar el estado del Alquiler en el array de alquileres del usuario
            this._usuarioService.actualizarEstadoAlquilerUsuario(Number(this.alquilerActual?.usuario._id), Number(this.alquilerActual?._id), 'completado').subscribe(
              () => {
                console.log('Alquiler actualizado con éxito');
              },
              error => {
                console.error('Error al actualizar el alquiler en el usuario:', error);
              }
            );
            // Actualizar el estado del Auto
            this._alquilerService.actualizarEstadoAuto(String(this.alquilerActual?._id), String(this.alquilerActual?.auto._id), 'mantenimiento').subscribe(
              () => {
                console.log('Estado del auto actualizado');

                const sucursalDevolucionId = this.alquilerActual!.sucursalDevolucion._id;
                this._alquilerService.actualizarSucursalAuto(String(this.alquilerActual?.auto._id), String(sucursalDevolucionId)).subscribe(
                  () => {
                    console.log('Sucursal del auto actualizada a la sucursal de devolución:', sucursalDevolucionId);
                  },
                  error => {
                    console.error('Error al actualizar la sucursal del auto:', error);
                  }
                );
              },
              error => {
                console.error('Error al actualizar el estado del auto:', error);
              }
            );
            this.toastr.success('Fecha de Fin Real actualizada');
            this.modalInstance?.hide();
          });
        });

        try {
          console.log("Aqui estoy", String(this.alquilerActual.auto._id));
          this._mantenimientoService.obtenerMantenimientos();
          this._mantenimientoService.crearMantenimientoAlquiler(String(this.alquilerActual?.auto._id));
          console.log("Aca estoy devuelta", String(this.alquilerActual?.auto._id));
        } catch (error) {
          console.error('Error al llamar crearMantenimientoAlquiler:', error);
        }
      }
    } else if (this.modalType === 'trabajador' && typeof this.modalInput === 'string') {
      const trabajadorId = parseInt(this.modalInput, 10); // Convierte el ID a número
      if (isNaN(trabajadorId)) {
        this.toastr.error('Error: Selección de trabajador inválida.');
        return;
      }
        this._alquilerService.modificarTrabajador(String(this.alquilerActual._id), Number(this.modalInput)).subscribe(() => {
            this._alquilerService.obtenerAlquiler(String(this.alquilerActual!._id)).subscribe(alquilerActualizado => {
              this.alquilerActual!.trabajadorAsignado = alquilerActualizado.trabajadorAsignado;
              this.toastr.success('Trabajador asignado actualizado');
              this.modalInstance?.hide();
            });
        });
    } else if (this.modalType === 'cancelacion' && typeof this.modalInput === 'string') {
        this._alquilerService.cambiarEstado(String(this.alquilerActual._id), 'cancelado').subscribe(() => {
          // Actualizar el estado del Alquiler
          this.alquilerActual!.estadoAlquiler = 'cancelado';
          // Actualizar el estado del Alquiler en el array de alquileres del usuario
          this._usuarioService.actualizarEstadoAlquilerUsuario(Number(this.alquilerActual?.usuario._id), Number(this.alquilerActual?._id), 'cancelado').subscribe(
            () => {
              console.log('Alquiler cancelado con éxito');
            },
            error => {
              console.error('Error al cancelar el alquiler en el usuario:', error);
            }
          );
          // Actualizar el estado del Auto
          this._alquilerService.actualizarEstadoAuto(String(this.alquilerActual?._id), String(this.alquilerActual?.auto._id), 'disponible').subscribe(
            () => {
              console.log('Estado del auto actualizado');
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
