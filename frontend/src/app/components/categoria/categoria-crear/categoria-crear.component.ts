import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { categoria } from '../../../models/categoria';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-categoria-crear',
  templateUrl: './categoria-crear.component.html',
  styleUrls: ['./categoria-crear.component.css']
})
export class CrearCategoriaComponent implements OnInit {
  categoriaForm: FormGroup;
  titulo = 'Agregar Categoría';
  id: string | null;
  usuarioLogueado: any;

  constructor(private fb: FormBuilder, private _categoriaService: CategoriaService, private _authservice: AuthService, private toastr: ToastrService, private router: Router, private aRouter: ActivatedRoute) {
    this.categoriaForm = this.fb.group({
      idCategoria: [''], // No es obligatorio, lo establecemos en controller
      nombreCategoria: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.usuarioLogueado = this._authservice.getUsuarioLogueado(); 
    if (!this.usuarioLogueado || this.usuarioLogueado.rol != 'administrador' && this.usuarioLogueado.rol != 'trabajador') {
      window.location.href = '/loginUsuario'; 
    } else {
    if (this.id !== null) {
      this.esEditar();
    }
  }
  }


  agregarCategoria() {
    const MARCA: categoria = {
      nombreCategoria: this.categoriaForm.get('nombreCategoria')?.value
    };
    // Usar el servicio para consultar si ya existe la categoria
    this._categoriaService.obtenerCategoriaPorNombre(MARCA.nombreCategoria).subscribe(
      (categoria: any[]) => {
        if (categoria && categoria.length > 0) {
          this.toastr.error('Ya hay una Categoria con ese nombre', 'Error');
        } else {
          if (this.id !== null) {
            // Editar categoría existente
            this._categoriaService.editarCategoria(this.id, MARCA).subscribe(
              (response) => {
                this.toastr.success('Categoria actualizada exitosamente', 'Éxito');
                this.router.navigate(['/categoria-listar']);
              },
              (error) => {
                this.toastr.error('Error al actualizar la Categoria', 'Error');
                console.error(error);
              }
            );
          } else {
            // Crear nueva categoria
            this._categoriaService.crearCategoria(MARCA).subscribe(
              data => {
                this.toastr.success('La Categoria fue registrada con éxito!', 'Categoria Registrada!');
                this.router.navigate(['/categoria-listar']);
              },
              error => this.toastr.error('Error al crear la Categoria.', 'Error')
            );
          }
        }
      },
      (error) => {
        console.error('Error en la consulta de categorias:', error);
        this.toastr.error('Error al consultar las Categorias existentes.', 'Error');
      }
    );
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
