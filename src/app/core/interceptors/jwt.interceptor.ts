import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {inject} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const localStorage: LocalStorageService = inject(LocalStorageService);
  const router: Router = inject(Router);

  const token: string | null = localStorage.getToken();

  if(!token){
    return next(req);
  }

  const headers = new HttpHeaders({
    authorization: token
  })

  const newReq: HttpRequest<any> = req.clone({headers});

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {

      // Gestion des erreurs en fonction du statut
      if (error.status === 401 || (error.status === 403)) {

        // Si non autorisé, rediriger l'utilisateur vers la page de connexion
        localStorage.removeToken();
        router.navigate(['/login']);

      } else {

        // Gérer les autres erreurs HTTP
        console.error(`Erreur HTTP: ${error.status}`, error.message);
      }

      // Retourner l'erreur pour être traitée par les composants appelants si nécessaire
      return throwError(() => new Error(error.message));
    })
  );
};
