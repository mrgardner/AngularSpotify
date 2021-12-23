// Common
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyInterceptorService implements HttpInterceptor {
  constructor() { }

  // TODO: Fix return types
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const spotifyUrl = req.url.split('https://api.spotify.com/v1/');
    // TODO: Add check for content-type of images
    if (spotifyUrl.length > 1) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem('spotifyToken')}`,
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(req);
  }
}
