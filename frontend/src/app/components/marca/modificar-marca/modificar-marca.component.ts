import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from '../../../services/marca.service';
import { marca } from '../../../models/marca';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modificar-marca',
  templateUrl: './modificar-marca.component.html',
  styleUrls: ['./modificar-marca.component.css']
})
export class ModificarMarcaComponent implements OnInit {
  marcaForm: FormGroup;
  marcaId!: number;

  constructor(
    private _marcaService: MarcaService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.marcaForm = this.fb.group({
      nombreMarca: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtener el id de la marca desde la URL
    this.marcaId = +this.route.snapshot.paramMap.get('id')!;

    // Obtener la marca por su ID
    this.getMarca(this.marcaId);
  }

  // Método para obtener los detalles de la marca
  getMarca(id: number) {
    this._marcaService.obtenerMarcaPorId(id).subscribe(
      (data) => {
        this.marcaForm.patchValue({
          nombreMarca: data.nombreMarca,
        });
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error al cargar la marca', 'Error');
      }
    );
  }

  // Método para actualizar la marca
  actualizarMarca() {
    if (this.marcaForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos', 'Error');
      return;
    }

    const marcaActualizada: marca = {
      _id: this.marcaId,
      nombreMarca: this.marcaForm.value.nombreMarca,
    };

    this._marcaService.actualizarMarca(this.marcaId, marcaActualizada).subscribe(
      () => {
        this.toastr.success('Marca actualizada con éxito', 'Éxito');
        this.router.navigate(['/marcas']);
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error al actualizar la marca', 'Error');
      }
    );
  }

  // Método para volver a la lista de marcas
  volver() {
    this.router.navigate(['/marcas']);
  }
}
