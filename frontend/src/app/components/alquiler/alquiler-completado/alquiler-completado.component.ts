import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { gestionCookiesService } from '../../../services/gestionCookies.service';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { AlquilerService } from '../../../services/alquiler.service';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-alquiler-completado',
  templateUrl: './alquiler-completado.component.html',
  styleUrls: ['./alquiler-completado.component.css']
})
export class AlquilerCompletadoComponent implements OnInit, OnDestroy {
  datosBusqueda: any;
  fechaRetiro: string = '';
  fechaDevolucion: string = '';
  diasReserva: number = 0;
  usuario: any;
  precioTotal: number = 0;
  private subscription: Subscription | null = null;;

 constructor(private router: Router, 
     private gestionCookiesService: gestionCookiesService, 
     private alquilerService: AlquilerService, 
     private usuarioService: UsuarioService,
     private authService: AuthService,
    ) {}
 

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
      error: () => {
        // Redirigir al login si ocurre un error
        this.router.navigate(['/loginUsuario']);
      }
    });

    console.log(this.usuario);

    this.datosBusqueda = this.gestionCookiesService.getDatosBusqueda();
    this.fechaRetiro = this.datosBusqueda.fechaRetiro;
        this.fechaDevolucion = this.datosBusqueda.fechaDevolucion;
        this.diasReserva = Number(moment(this.fechaDevolucion, 'YYYY-MM-DD').diff(moment(this.fechaRetiro, 'YYYY-MM-DD'), 'days'));
        this.precioTotal = this.diasReserva * this.datosBusqueda.modeloElegido.precioXdia * 1.21; // Incluimos el IVA
      //  this.usuario = this.authService.getUsuarioLogueado();

    
    this.confirmarReserva();


    this.subscription = this.router.events.subscribe(event => {
      if (event) {
        // Borrar las cookies al iniciar la navegación hacia otra ruta
        this.gestionCookiesService.borrarCookie('datosBusqueda');
        this.gestionCookiesService.borrarCookie('datosBusquedaExpiration');
        this.gestionCookiesService.borrarCookie('modelosDisponibles');
        this.gestionCookiesService.borrarCookie('autosCoincidentesIds');
      }
    });

    // Obtener datos de datosBusqueda desde el servicio
    this.datosBusqueda = this.gestionCookiesService.getDatosBusqueda();
    
    // Verificar si modeloElegido existe en datosBusqueda
    if (!this.datosBusqueda || !this.datosBusqueda.modeloElegido) {
      console.warn("Cookies faltantes. Redirigiendo...");
      window.location.href = '/buscador';
    }

    this.fechaRetiro = this.datosBusqueda.fechaRetiro;
    this.fechaDevolucion = this.datosBusqueda.fechaDevolucion;
    this.diasReserva = Number(moment(this.fechaDevolucion, 'YYYY-MM-DD').diff(moment(this.fechaRetiro, 'YYYY-MM-DD'), 'days'));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isAdminTrabajador() {
    this.authService.verificarToken().subscribe(
      (response) => {
        if (!response.existe) {
          // No hay ningun usuario logueado, se permite el acceso
        } else {
          // Si hay un token, se verifica que sea de rol usuario
          this.authService.getAuthenticatedUser().subscribe(
            (user) => {
              if (user.rol === 'administrador' || user.rol === 'trabajador') {
                this.router.navigate(['/loginUsuario']);
              } else if (user.rol === 'usuario') {
                this.usuario = user
              } else {
                // Caso para roles desconocidos (opcional)
                this.router.navigate(['/loginUsuario']);
              }
            },
            (error) => {
              this.router.navigate(['/loginUsuario']);
            }
          );
        }
      },
      (error) => {
        
        this.router.navigate(['/loginUsuario']);
      }
    );
  }

  confirmarReserva(): void{
    try {
      // Crear las fechas con horas integradas
      const fechaInicio = moment(this.datosBusqueda.fechaRetiro + ' ' + this.datosBusqueda.horaRetiro, 'YYYY-MM-DD HH:mm').utcOffset('-03:00').toDate();
      const fechaFin = moment(this.datosBusqueda.fechaDevolucion + ' ' + this.datosBusqueda.horaDevolucion, 'YYYY-MM-DD HH:mm').utcOffset('-03:00').toDate();

      // Actualizar datosBusqueda en el servicio y en la cookie con tiempo de expiración
      this.gestionCookiesService.setDatosBusqueda(this.datosBusqueda, undefined, undefined, this.precioTotal);  // Le enviamos el precio para que lo sume a las cookies
      // Volvemos a obtener toda la cookie nuevamente, ya actualizada, y guardamos en misma variable
      this.datosBusqueda = this.gestionCookiesService.getDatosBusqueda();

      const alquilerData = {
        usuario: this.usuario._id,
        auto: this.datosBusqueda.autoAsignado,
        sucursalEntrega: this.datosBusqueda.sucursalRetiro._id,
        sucursalDevolucion: this.datosBusqueda.sucursalDevolucion._id,
        trabajadorAsignado: this.datosBusqueda.trabajadorAsignado || undefined, // No es obligatorio
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        fechaInicioReal: undefined,
        fechaFinReal: undefined,
        notas: undefined,
        precioTotalAlquiler: this.datosBusqueda.precioTotal,
        estadoAlquiler: 'reservado'
      };


      console.log("Alquiler Data:", alquilerData); // Verifica que todos los datos sean correctos

      // Llamada al servicio para crear el alquiler
      this.alquilerService.crearAlquiler(alquilerData).subscribe(
        async (response) => {
          if (this.usuario.alquileres) {
            this.usuario.alquileres.push(response);  // Agregar el nuevo alquiler al array
          } else {
            this.usuario.alquileres = [response]; // Si no existe el array, crearlo
          }

          // Enviar solo el alquiler creado en vez del array completo
          console.log(this.usuario._id);
          this.usuarioService.actualizarAlquileresUsuario(Number(this.usuario._id), response).subscribe(
            () => {
              console.log('Alquiler añadido al usuario actual.');
              this.gestionCookiesService.setDatosBusqueda(this.datosBusqueda, undefined, undefined, undefined, response._id);
              this.alquilerService.reservarEstadoAuto(this.datosBusqueda.autoAsignado, 'reservado').subscribe(
                async () => {
                  console.log('Estado del auto actualizado a "reservado".');
                  
                  // Crear la sesión de pago con Stripe
               
                },
                error => {
                  console.error('Error al actualizar el estado del auto:', error);
                }
              );
            },
            error => {
              console.error('Error al actualizar el usuario con el nuevo alquiler:', error);
            }
          );
        },
        error => {
          console.error('Error al crear el alquiler:', error);
        }
      );
    } catch (error) {
      console.error('Error al realizar reserva:', error);
      alert("Hubo un error al realizar la reserva. Intente nuevamente.");
    }
  }
  generatePDF() {
    const ticket = document.querySelector('.reservation');
    if (ticket) {
      const options = {
        margin: 0.5,
        filename: 'constancia_reserva_vehiculo.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      (window as any).html2pdf().set(options).from(ticket).save();
    } else {
      console.error("No se encontró el elemento '.reservation'");
    }
  }

}
