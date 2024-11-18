import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';
import { Router } from '@angular/router';
import { AlquilerService } from '../../services/alquiler.service';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})

export class BuscadorComponent implements OnInit {
  sucursales: any[] = [];
  selectedSucursalRetiro: string = '';
  selectedSucursalDevolucion: string = '';
  fechaRetiro: string = '';
  horaRetiro: string = '';
  fechaDevolucion: string = '';
  horaDevolucion: string = '';
  horariosRetiroDisponibles: string[] = [];
  horariosDevolucionDisponibles: string[] = [];
  isFormValid: boolean = false;
  isDateValid: boolean = false;

  constructor(private sucursalService: SucursalService, private alquilerService: AlquilerService, private router: Router, private cookieService: CookieService, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Obtener las Sucursales
    this.sucursalService.obtenerSucursales().subscribe(
      (data) => {
        this.sucursales = data;

        // Simular clic en el select para forzar renderizado de opciones
        setTimeout(() => {
          const selectElement = document.getElementById('selectSucursalRetiro') as HTMLSelectElement;
          if (selectElement) {
            selectElement.click();
            setTimeout(() => selectElement.blur(), 100);
          }
        }, 500);
      },
      (error) => console.error('Error al obtener sucursales:', error)
    );
  }

  // Método para generar intervalos de media hora entre el horario de apertura y cierre
  generarHorariosRetiroDisponibles(apertura: string, cierre: string): void {
    const start = moment(apertura, "HH:mm");
    const end = moment(cierre, "HH:mm");
    const horarios = [];

    while (start.isBefore(end)) {
      horarios.push(start.format("HH:mm"));
      start.add(30, 'minutes');
    }

    this.horariosRetiroDisponibles = horarios;
  }
  generarHorariosDevolucionDisponibles(apertura: string, cierre: string): void {
    const start = moment(apertura, "HH:mm");
    const end = moment(cierre, "HH:mm");
    const horarios = [];

    while (start.isBefore(end)) {
      horarios.push(start.format("HH:mm"));
      start.add(30, 'minutes');
    }

    this.horariosDevolucionDisponibles = horarios;
  }
  onSucursalRetiroSeleccionada() {
    // Obtener los detalles de la sucursal seleccionada por su id
    const sucursalSeleccionada = this.sucursales.find(sucursal => sucursal._id === Number(this.selectedSucursalRetiro));

    if (sucursalSeleccionada) {
      // Generar los horarios disponibles basados en la apertura y cierre de la sucursal seleccionada
      this.generarHorariosRetiroDisponibles(sucursalSeleccionada.horaAperturaSucursal, sucursalSeleccionada.horaCierreSucursal);
    }
  }
  onSucursalDevolucionSeleccionada() {
    // Obtener los detalles de la sucursal seleccionada por su id
    const sucursalSeleccionada = this.sucursales.find(sucursal => sucursal._id === Number(this.selectedSucursalDevolucion));

    if (sucursalSeleccionada) {
      // Generar los horarios disponibles basados en la apertura y cierre de la sucursal seleccionada
      this.generarHorariosDevolucionDisponibles(sucursalSeleccionada.horaAperturaSucursal, sucursalSeleccionada.horaCierreSucursal);
    }
  }

  verificarCamposCompletos() {
    this.isFormValid = 
    (this.selectedSucursalRetiro !== '' &&
    this.selectedSucursalDevolucion !== '' &&
    this.fechaRetiro !== '' &&
    this.horaRetiro !== '' &&
    this.fechaDevolucion !== '' &&
    this.horaDevolucion !== '');
  }
  verificarFechasValidas() {
    const fechaRetiroMoment = moment(this.fechaRetiro, "YYYY-MM-DD");
    const fechaDevolucionMoment = moment(this.fechaDevolucion, "YYYY-MM-DD");

    this.isDateValid = ((fechaDevolucionMoment.isAfter(fechaRetiroMoment)) && fechaRetiroMoment.isAfter(moment().format('YYYY-MM-DD')));
  }

  realizarBusqueda(): void {
  if (this.isFormValid && this.isDateValid) {
    // Obtener sucursales completas utilizando suscripciones
    this.sucursalService.obtenerSucursal(this.selectedSucursalRetiro).subscribe((sucursalRetiroData) => {
      this.sucursalService.obtenerSucursal(this.selectedSucursalDevolucion).subscribe((sucursalDevolucionData) => { // No se ejecuta hasta que sucursalRetiroData se haya recibido
        const data = {
          sucursalRetiro: sucursalRetiroData, // Objeto completo
          sucursalDevolucion: sucursalDevolucionData, // Objeto completo
          fechaRetiro: this.fechaRetiro,
          fechaDevolucion: this.fechaDevolucion,
          horaRetiro: this.horaRetiro,
          horaDevolucion: this.horaDevolucion,
          modeloElegido: undefined,
          precioTotal: undefined,
        };

        this.alquilerService.buscarModelosDisponibles(data).subscribe(
          (modelos) => {
            // Cookies
            const expirationDate = new Date();
            expirationDate.setSeconds(expirationDate.getSeconds() + 1800); // Tiempo de expiración de las cookies en 1800 = 30 minutos
            this.cookieService.set('datosBusqueda', JSON.stringify(data), { expires: expirationDate, path: '/' });
            this.cookieService.set('modelosDisponibles', JSON.stringify(modelos), { expires: expirationDate, path: '/' });
            this.cookieService.set('datosBusquedaExpiration', expirationDate.toISOString(), { path: '/' });  // Guardar la fecha de expiración en una segunda cookie

            // Redirigir a "modelo-listar"
            window.location.href = '/modelo-listar';
          },
          (error) => console.error('Error al buscar modelos disponibles:', error)
        );
      });
    });
  } else if (!this.isFormValid){
    this.toastr.warning('Por favor, complete todos los campos antes de realizar la búsqueda.', 'Formulario de Búsqueda');
  } else {
    this.toastr.warning('Por favor, revise las fechas indicadas. La fecha de retiro debe ser posterior a hoy, y la fecha de devolución debe ser posterior a la fecha de retiro.', 'Formulario de Búsqueda');
  }
}

}