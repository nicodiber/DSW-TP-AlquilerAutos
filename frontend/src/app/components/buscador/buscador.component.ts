import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';
import { Router } from '@angular/router';
import { AlquilerService } from '../../services/alquiler.service';
import moment from 'moment';

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

  constructor(private sucursalService: SucursalService, private alquilerService: AlquilerService, private router: Router) {}

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

    // Recarga la primera vez para que todo se vea bien, pero evitando loop
    if (window.localStorage) {
      if (!localStorage.getItem('reload')) {
        localStorage['reload'] = true;
        window.location.reload();
      } else {
        localStorage.removeItem('reload');
      }
    }
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

    this.isDateValid = (fechaDevolucionMoment.isAfter(fechaRetiroMoment));
  }

  realizarBusqueda(): void {
    if (this.isFormValid && this.isDateValid) {
      const data = {
        sucursalRetiro: Number(this.selectedSucursalRetiro),
        sucursalDevolucion: Number(this.selectedSucursalDevolucion),
        fechaRetiro: this.fechaRetiro,
        fechaDevolucion: this.fechaDevolucion,
        horaRetiro: this.horaRetiro,
        horaDevolucion: this.horaDevolucion
      };

      this.alquilerService.buscarModelosDisponibles(data).subscribe(
        (modelos) => {
          localStorage.setItem('datosBusqueda', JSON.stringify(data)); // Almacenar temporalmente
          localStorage.setItem('modelosDisponibles', JSON.stringify(modelos));
          if (localStorage.getItem('reload')) {
            localStorage.removeItem('reload');
          }
          this.router.navigate(['/modelo-listar']); // Redirigir a "modelo-listar"
        },
        (error) => console.error('Error al buscar modelos disponibles:', error)
      );

    } else if (!this.isFormValid) {
      alert("Por favor, complete todos los campos antes de realizar la búsqueda.");
    } else {
      alert("La fecha de devolución debe ser posterior a la fecha de retiro.");
    }
  }
}