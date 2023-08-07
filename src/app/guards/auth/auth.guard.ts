import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // TODO: Refactor to use ngrx
    const token = !!this.authService.getSpotifyToken();
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}