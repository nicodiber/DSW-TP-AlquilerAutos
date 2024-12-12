import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarcaService } from '../../../services/marca.service';
import { modelo } from '../../../models/modelo';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-marca-modelo-listar',
  templateUrl: './marca-modelo-listar.component.html',
  styleUrl: './marca-modelo-listar.component.css'
})
export class ListarMarcaModeloComponent {
  modelos: modelo[] = [];
  idMarca!: string;
  nombreMarca!: string;
  usuarioLogueado: any;

  constructor(private route: ActivatedRoute, private _authservice: AuthService, private marcaService: MarcaService) { }

  ngOnInit(): void {
    this.isNotAdminTrabajador();
    this.idMarca = this.route.snapshot.paramMap.get('idMarca')!;
    this.nombreMarca = this.route.snapshot.paramMap.get('nombreMarca')!;
    this.getModelosByMarca(this.idMarca);
    
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

  getModelosByMarca(idMarca: string): void {
    this.marcaService.obtenerModelosPorMarca(idMarca).subscribe(
      (data: modelo[]) => {
        this.modelos = data;
      },
      error => {
        console.error('Error al obtener los modelos por Marca:', error);
      }
    );
  }

}
