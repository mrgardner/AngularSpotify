// Common
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { AuthService } from '@app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = !!this.authService.getSpotifyToken();
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
