import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SpotifyPlaybackService } from '../spotify-playback/spotify-playback.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly state: string;
  private readonly loginURI: string;
  constructor(private cookieService: CookieService, private router: Router, private spotifyPlaybackService: SpotifyPlaybackService) {
    this.state = this.generateRandomString(16);
    const query =
      `response_type=${environment.spotify.loginResponseType}` +
      `&client_id=${environment.spotify.clientID}` +
      `&scope=${environment.spotify.scope}` +
      `&redirect_uri=${environment.spotify.redirectURI}` +
      `&state=${this.state}`;
    this.loginURI = environment.spotify.authURI + query;
  }

  login(): void {
    const that = this;
    const popup = window.open(
      this.loginURI,
      'Login with Spotify',
      'width=800, height=800'
    );

    window['spotifyCallback'] = () => {
      popup.close();
      setTimeout(() => {
        that.router.navigate(['']);
        that.spotifyPlaybackService.setupPlayer();
      }, 100);
    };
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

  getSpotifyToken(): string {
    return this.cookieService.get('spotifyToken');
  }

  generateRandomString(length) {
    let text = '';
    const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
