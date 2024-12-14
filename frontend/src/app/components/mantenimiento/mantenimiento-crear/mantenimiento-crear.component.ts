import { Component, OnInit } from '@angular/core';
import { AutoService } from '../../../services/auto.service';
import { auto } from '../../../models/auto';

@Component({
  selector: 'app-mantenimiento-crear',
  templateUrl: './mantenimiento-crear.component.html',
  styleUrls: ['./mantenimiento-crear.component.css']
})
export class MantenimientoCrearComponent implements OnInit {
  autosDisponibles: auto[] = [];

  constructor(private autoService: AutoService) { }

  ngOnInit(): void {
    // Llamada al servicio para obtener los autos con estado "disponible"
    this.autoService.obtenerAutosDisponibles().subscribe((autos) => {
      this.autosDisponibles = autos;
    });
  }

  // Función para cambiar el estado del auto a 'mantenimiento'
  cambiarEstadoAjuste(autoId?: number): void {
    if (!autoId) {
      console.error('El ID del auto no es válido');
      return;
    }

    this.autoService.cambiarEstado(autoId, 'mantenimiento').subscribe(() => {
      this.ngOnInit(); // Recargar la lista de autos disponibles
    });
  }
}
