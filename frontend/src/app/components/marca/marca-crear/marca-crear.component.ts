import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../../services/marca.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { marca } from '../../../models/marca';

@Component({
  selector: 'app-marca-crear',
  templateUrl: './marca-crear.component.html',
  styleUrls: ['./marca-crear.component.css']
})
export class CrearMarcaComponent implements OnInit {
  marcaForm: FormGroup;
  titulo = 'Agregar Marca';
  id: string | null;

  constructor(private fb: FormBuilder, private _marcaService: MarcaService, private toastr: ToastrService, private router: Router, private aRouter: ActivatedRoute) {
    this.marcaForm = this.fb.group({
      idMarca: [''], // No es obligatorio, lo establecemos en controller
      nombreMarca: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.esEditar();
    }
  }

  agregarMarca() {
    const MARCA: marca = {
      nombreMarca: this.marcaForm.get('nombreMarca')?.value
    };

    if (this.id !== null) {
      // Editar cateogoria
      this._marcaService.editarMarca(this.id, MARCA).subscribe(
        (response) => {
          this.toastr.success('Marca actualizada exitosamente', 'Éxito');
          this.router.navigate(['/marca-listar']);
        },
      
        (error) => {
          this.toastr.error('Error al actualizar la Marca', 'Error');
          console.error(error);
        }
      );
    } else {
      // Crear nueva marca
      this._marcaService.crearMarca(MARCA).subscribe(
        data => {
          this.toastr.success('La Marca fue registrado con éxito!', 'Marca Registrada!');
          this.router.navigate(['/marca-listar']);
        },
        error => this.toastr.error('Error al crear la Marca.', 'Error')
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Marca';
      this._marcaService.obtenerMarca(this.id).subscribe(data => {
        this.marcaForm.patchValue({
          nombreMarca: data.nombreMarca
        });
      });
    }
  }
}
