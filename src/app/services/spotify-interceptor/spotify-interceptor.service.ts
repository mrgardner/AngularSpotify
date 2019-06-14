import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyInterceptorService implements HttpInterceptor {
  constructor(private utilService: UtilService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const spotifyUrl = req.url.split('https://api.spotify.com/v1/');
    // TODO: Add check for content-type of images
    if (spotifyUrl.length > 1) {
      console.log(this.utilService.getCookie('spotifyToken'))
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.utilService.getCookie('spotifyToken'),
          'Content-Type': 'application/json'
        }
      });

    }
    return next.handle(req);
  }
}
