import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpEventType, HttpEvent} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>  => {
  const authService = inject(AuthService);
  const token = authService.getToken()

  if(token){
    req = req.clone({
      setHeaders:{ 
        token
      }
    })
  }
  return next(req).pipe(
    catchError((error) => {
      const codeStatus = [401, 403]
      if(codeStatus.includes(error.status)){
        authService.logout().subscribe({
          next: () => {
            window.location.href = '/loginUsuario';
          },
        error: (err) => {
          console.error('Error al cerrar sesión:', err);
        }
        });
    }
    return throwError(() => error )
  }
  
  ));
};
