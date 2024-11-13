import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AutoService } from '../../../services/auto.service';
import { auto } from '../../../models/auto';

@Component({
  selector: 'app-auto-listar',
  templateUrl: './auto-listar.component.html',
  styleUrls: ['./auto-listar.component.css']
})
export class AutoListarComponent implements OnInit {
  listaAutos: auto[] = [];

  constructor(private autoService: AutoService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerAutos();
  }

  obtenerAutos() {
    this.autoService.obtenerAutos().subscribe({
      next: (data) => {
        this.listaAutos = data;
      },
      error: (err) => console.error('Error al obtener los autos:', err)
    });
  }

  eliminarAuto(autoId: number) {
    this.autoService.eliminarAuto(autoId).subscribe({
      next: () => {
        this.toastr.success('Auto eliminado con éxito');
        this.obtenerAutos(); // Actualiza la lista después de eliminar
      },
      error: (err) => {
        if (err.status === 400) {
          this.toastr.error(err.error.msg, 'Error');
        } else {
          console.error('Error al eliminar auto:', err);
        }
      }
    });
  }

}
