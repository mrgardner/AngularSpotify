import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {AuthService} from '../../services/auth/auth.service';
import { SpotifyToken } from 'src/app/interfaces/spotify-token/spotify-token.interface';
import { SpotifyPlaybackService } from 'src/app/services/spotify-playback/spotify-playback.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public loggedIn: boolean;
  public displayName: string;

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private spotifyPlaybackService: SpotifyPlaybackService,
    private cookieService: CookieService,
    private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const tt = !!this.cookieService.get('spotifyToken');
      if (tt) {
        // this.spotifyPlaybackService.setupPlayer();
      }
    });
  }

  isLoggedIn() {
    return !!this.authService.getSpotifyToken();
  }

  logout(): void {
    this.authService.logout();
  }
}
