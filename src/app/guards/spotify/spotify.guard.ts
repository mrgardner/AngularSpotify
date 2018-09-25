import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {SpotifyService} from '../../services/spotify/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyGuard implements CanActivate {
  constructor(private router: Router, private spotifyService: SpotifyService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.spotifyService.getAuthToken().subscribe(token => {
      if (!token['token']) {
        this.router.navigate(['']);
        return false;
      }
    });
    return true;
  }
}
