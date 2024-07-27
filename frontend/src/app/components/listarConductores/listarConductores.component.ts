import { Component, OnInit } from '@angular/core';
import { ConductorService } from '../../services/conductor.service';
import { conductor } from '../../models/conductor';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs';


@Component({
  selector: 'app-listarConductores',
  templateUrl: './listarConductores.component.html',
  styleUrl: './listarConductores.component.css'
})

export class ListarConductoresComponent implements OnInit {
  listConductores: conductor[] = [];

  // Inyectamos el servicio (conductor.services) que acabamos de crear
  constructor(private _conductorService: ConductorService,
              private toastr: ToastrService){}

  ngOnInit(): void {
    this.obtenerConductores();
  }

  formatDateToDDMMYYYY(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const day = ('0' + d.getUTCDate()).slice(-2);
    const month = ('0' + (d.getUTCMonth() + 1)).slice(-2);
    const year = d.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  // ACLARACION ==> POR ALGUNA RAZON EL .subscribe me lo tacha, asi q tuve que usar el next y el error, aunq funciona igual
  // Al devolver un observable, nos tenemos que suscribir
  obtenerConductores() {
    this._conductorService.getConductores().subscribe({
      next: (data) => {
        console.log(data);
        this.listConductores = data;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Error al obtener conductores', 'Error');
      }
    });
  }

  eliminarConductor(id: any) {
    this._conductorService.eliminarConductor(id).subscribe({
      next: (data) => {
        this.toastr.error('El conductor fue eliminado con éxito', 'Conductor Eliminado');
        this.obtenerConductores();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Error al eliminar conductor', 'Error');
      }
    });
  }

}
