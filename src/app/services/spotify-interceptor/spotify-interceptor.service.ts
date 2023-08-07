import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyInterceptorService implements HttpInterceptor {
  constructor(private router: Router) { }

  // TODO: Fix return types
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const graphqlUrl = req.url.includes('/graphql');
    const spotifyUrl = req.url.includes('api.spotify.com/v1/');
    // TODO: Add check for content-type of images
    if (spotifyUrl) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem('spotifyToken')}`,
          'Content-Type': 'application/json'
        }
      });
    } else if (graphqlUrl) {
      next.handle(req).subscribe(event => {
        if (event instanceof HttpResponse) {
          if (event.body.errors) {
            event.body.errors.forEach((error: Error) => {
              if (error.message === "Error: Token expired") {
                sessionStorage.clear();
                this.router.navigate(['login']);
              }
            })
          }
        }
      })
    }
    return next.handle(req)
      .pipe(catchError((err: HttpErrorResponse) => {
        const errorMessage = `Error Code: ${err.status} Message: ${err.message}`
        if (err.status === 401) {
          sessionStorage.clear();
          this.router.navigate(['login']);
        }
        return throwError(errorMessage)
      }))
  }
}