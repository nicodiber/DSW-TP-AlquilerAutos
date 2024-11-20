import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { modelo } from '../../../models/modelo';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-categoria-modelo-listar',
  templateUrl: './categoria-modelo-listar.component.html',
  styleUrl: './categoria-modelo-listar.component.css'
})
export class ListarCategoriaModeloComponent {
  modelos: modelo[] = [];
  idCategoria!: string;
  nombreCategoria!: string;
  usuarioLogueado: any;

  constructor(private route: ActivatedRoute, private _authservice: AuthService, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.usuarioLogueado = this._authservice.getUsuarioLogueado(); 
    if (!this.usuarioLogueado || this.usuarioLogueado.rol != 'administrador' && this.usuarioLogueado.rol != 'trabajador') {
      window.location.href = '/loginUsuario'; 
    } else {
    this.idCategoria = this.route.snapshot.paramMap.get('idCategoria')!;
    this.nombreCategoria = this.route.snapshot.paramMap.get('nombreCategoria')!;
    this.getModelosByCategoria(this.idCategoria);
    }
  }

  getModelosByCategoria(idCategoria: string): void {
    this.categoriaService.obtenerModelosPorCategoria(idCategoria).subscribe(
      (data: modelo[]) => {
        this.modelos = data;
      },
      error => {
        console.error('Error al obtener los modelos por categoría:', error);
      }
    );
  }

}
