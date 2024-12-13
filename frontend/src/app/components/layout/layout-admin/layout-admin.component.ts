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
    this.usuario = this.usuario || {};
    this.authService.getAuthenticatedUser().subscribe({
      next: (usuario) => {
        if (usuario) {
          this.usuario = usuario;
        } else {
          this.router.navigate(['/loginUsuario']);
        }
      },
      error: () => {
        this.router.navigate(['/loginUsuario']);
      },
    });
  }
}