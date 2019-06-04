import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyInterceptorService implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const spotifyUrl = req.url.split('https://api.spotify.com/v1/');
    // TODO: Add check for content-type of images
    if (spotifyUrl.length > 1) {
      console.log(this.cookieService.get('token'), req);
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.cookieService.get('token'),
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(req);
  }
}
