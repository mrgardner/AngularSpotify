import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {AuthService} from '../../services/auth/auth.service';
import { SpotifyToken } from 'src/app/interfaces/spotify-token/spotify-token.interface';
import { SpotifyPlaybackService } from 'src/app/services/spotify-playback/spotify-playback.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public loggedIn: boolean;
  public isLoggedIn: boolean;

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private spotifyPlaybackService: SpotifyPlaybackService) {}

  ngOnInit() {
    this.spotifyService.getAuthToken().subscribe((token: SpotifyToken) => {
      this.loggedIn = !!token.token;
      this.spotifyPlaybackService.setupPlayer(token.token);
    });
    this.authService.isAuthenticated().subscribe((data: Object) => this.isLoggedIn = !!data);
  }

  loginSpotify(): void {
    this.spotifyService.login();
  }

  logoutOfSpotify(): void {
    this.spotifyService.logout();
  }

  logout(): void {
    this.authService.logout();
  }
}
