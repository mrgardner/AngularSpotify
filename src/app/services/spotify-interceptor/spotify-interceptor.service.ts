import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthApiActions } from '@app/store/actions/auth.action';
import { Store } from '@ngrx/store';
import { Observable, throwError, } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyInterceptorService implements HttpInterceptor {
  constructor(private store: Store) { }

  // TODO: Fix return types
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const spotifyUrl = req.url.includes('api.spotify.com/v1/');
    // TODO: Add check for content-type of images
    if (spotifyUrl) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem('spotifyToken')}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          if (event.body.errors) {
            event.body.errors.forEach((error: Error) => {
              if (error.message === "Error: Token expired") {
                this.store.dispatch(AuthApiActions.logout());
              }
            })
          }
        }
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = `Error Code: ${err.status} Message: ${err.message}`
        if (err.status === 401) {
          this.store.dispatch(AuthApiActions.logout());
        }
        return throwError(errorMessage)
      })
    )
  }
}