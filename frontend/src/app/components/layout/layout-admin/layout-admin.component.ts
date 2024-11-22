import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})
export class LayoutAdminComponent implements OnInit { 
  usuario: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  const usuarioLogueado = this.authService.getUsuarioLogueado();
    if (usuarioLogueado.rol === 'usuario') {
      this.router.navigate(['/loginUsuario']);  // Redirigir al login si no hay usuario
    } else {
      this.usuario = usuarioLogueado;
    };
      
  }

}