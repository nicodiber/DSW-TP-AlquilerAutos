import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getAuthenticatedUser().pipe(
      map((user) => {
        if (user.rol === 'administrador') {
          
          return true; // Permitir acceso
        } else {
          return this.router.createUrlTree(['/loginUsuario']); // Redirigir al login
        }
      }),
      catchError(() => {
        // Envolver el UrlTree en un observable con 'of'
        return of(this.router.createUrlTree(['/loginUsuario']));
      })
    );
  }
}
