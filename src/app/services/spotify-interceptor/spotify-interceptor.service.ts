import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    const tt = req.url.split('https://api.spotify.com/v1/');
    if (tt.length > 1) {
      // TODO set the token for all requests

      // req = req.clone({
      //   withCredentials: true,
      //   setHeaders: {
      //     Authorization: 'Bearer ' + token
      //   }
      // });
    }
    return next.handle(req);
  }
}
