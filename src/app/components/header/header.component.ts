import { Component, OnInit } from '@angular/core';
import { SpotifyPlaybackService } from 'src/app/services/spotify-playback/spotify-playback.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public loggedIn: boolean;
  public displayName: string;

  constructor(
    private authService: AuthService,
    private spotifyPlaybackService: SpotifyPlaybackService,
    private cookieService: CookieService,
    private router: Router) {}

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.spotifyPlaybackService.setupPlayer();
    }
  }

  isLoggedIn(): boolean {
    return !!this.authService.getSpotifyToken();
  }

  logout(): void {
    this.cookieService.deleteAll();
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['login']);
  }
}
