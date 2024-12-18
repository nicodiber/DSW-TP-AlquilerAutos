import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../../services/marca.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { marca } from '../../../models/marca';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-marca-crear',
  templateUrl: './marca-crear.component.html',
  styleUrls: ['./marca-crear.component.css']
})
export class CrearMarcaComponent implements OnInit {
  marcaForm: FormGroup;
  titulo = 'Agregar Marca';
  id: string | null;
  usuarioLogueado: any;

  constructor(private fb: FormBuilder, private _marcaService: MarcaService, private _authservice: AuthService, private toastr: ToastrService, private router: Router, private aRouter: ActivatedRoute) {
    this.marcaForm = this.fb.group({
      idMarca: [''], // No es obligatorio, lo establecemos en controller
      nombreMarca: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isNotAdminTrabajador();
    if (this.id !== null) {
      this.esEditar();
    }
  
  }

  isNotAdminTrabajador() {
        this._authservice.getAuthenticatedUser().subscribe(
          (user) => {
            if (user.rol === 'administrador' || user.rol === 'trabajador') {
              // Si el rol es admin o trabajador, se permite el acceso
            } else {
              // Otros roles, patea a login
              window.location.href = '/loginUsuario';
            }
          },
          (error) => {
            window.location.href = '/loginUsuario';
          }
        );
    }

  agregarMarca() {
    const MARCA: marca = {
      nombreMarca: this.marcaForm.get('nombreMarca')?.value
    };
    // Usar el servicio para consultar si ya existe la marca
    this._marcaService.obtenerMarcaPorNombre(MARCA.nombreMarca).subscribe(
      (marca: any[]) => {
        if (marca && marca.length > 0) {
          this.toastr.error('Ya hay una Marca con ese nombre', 'Error');
        } else {
          if (this.id !== null) {
            // Editar categoría existente
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
                this.toastr.success('La Marca fue registrada con éxito!', 'Marca Registrada!');
                this.router.navigate(['/marca-listar']);
              },
              error => this.toastr.error('Error al crear la Marca.', 'Error')
            );
          }
        }
      },
      (error) => {
        console.error('Error en la consulta de marcas:', error);
        this.toastr.error('Error al consultar las Marcas existentes.', 'Error');
      }
    );
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
