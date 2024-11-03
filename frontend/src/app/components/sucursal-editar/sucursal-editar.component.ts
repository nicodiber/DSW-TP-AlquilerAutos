import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SucursalService } from '../../services/sucursal.service';
import { sucursal } from '../../models/sucursal';

@Component({
  selector: 'app-sucursal-editar',
  templateUrl: './sucursal-editar.component.html',
  styleUrls: ['./sucursal-editar.component.css']
})
export class SucursalEditarComponent implements OnInit {
  idSucursal: string = '';
  sucursalData: sucursal | null = null; // Inicializa con null
  mensaje: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sucursalService: SucursalService
  ) { }

  ngOnInit(): void {
    this.idSucursal = this.route.snapshot.paramMap.get('id') || '';
    this.obtenerSucursal();
  }

  obtenerSucursal(): void {
    this.sucursalService.obtenerSucursal(this.idSucursal).subscribe(
      (data) => {
        this.sucursalData = data;
      },
      (error) => {
        this.mensaje = 'Error al obtener la sucursal';
        console.error(error);
      }
    );
  }

  editarSucursal(): void {
    if (this.sucursalData) {
      this.sucursalService.editarSucursal(this.idSucursal, this.sucursalData).subscribe(
        (response) => {
          this.mensaje = 'Sucursal actualizada con éxito';
          this.router.navigate(['/sucursal-listar']); // Redirigir a la lista de sucursales
        },
        (error) => {
          this.mensaje = 'Error al actualizar la sucursal';
          console.error(error);
        }
      );
    }
  }
}
