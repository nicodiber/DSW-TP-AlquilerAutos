import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { categoria } from '../../../models/categoria';

@Component({
  selector: 'app-categoria-crear',
  templateUrl: './categoria-crear.component.html',
  styleUrls: ['./categoria-crear.component.css']
})
export class CrearCategoriaComponent implements OnInit {
  categoriaForm: FormGroup;
  titulo = 'Agregar Categoría';
  id: string | null;

  constructor(private fb: FormBuilder, private _categoriaService: CategoriaService, private toastr: ToastrService, private router: Router, private aRouter: ActivatedRoute) {
    this.categoriaForm = this.fb.group({
      idCategoria: [''], // No es obligatorio, lo establecemos en controller
      nombreCategoria: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.esEditar();
    }
  }

  agregarCategoria() {
    const CATEGORIA: categoria = {
      nombreCategoria: this.categoriaForm.get('nombreCategoria')?.value
    };

    if (this.id !== null) {
      // Editar cateogoria
      this._categoriaService.editarCategoria(this.id, CATEGORIA).subscribe(
        (response) => {
          this.toastr.success('Categoría actualizada exitosamente', 'Éxito');
          this.router.navigate(['/categoria-listar']);
        },
      
        (error) => {
          this.toastr.error('Error al actualizar la Categoría', 'Error');
          console.error(error);
        }
      );
    } else {
      // Crear nueva categoria
      this._categoriaService.crearCategoria(CATEGORIA).subscribe(
        data => {
          this.toastr.success('La categoría fue registrado con éxito!', 'Categoría Registrada!');
          this.router.navigate(['/categoria-listar']);
        },
        error => this.toastr.error('Error al crear la Categoria.', 'Error')
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Categoria';
      this._categoriaService.obtenerCategoria(this.id).subscribe(data => {
        this.categoriaForm.patchValue({
          nombreCategoria: data.nombreCategoria
        });
      });
    }
  }
}
