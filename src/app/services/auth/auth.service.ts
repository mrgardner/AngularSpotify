import {Injectable} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService, private router: Router) {}

  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

  getSpotifyToken(): string {
    return this.cookieService.get('spotifyToken');
  }
}
