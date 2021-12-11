// Common
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Environments
import { environment } from '@environments/environment';

// Services
import { SpotifyPlaybackService } from '@services/spotify-playback/spotify-playback.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly state: string;
  private readonly loginURI: string;
  constructor(private router: Router, private spotifyPlaybackService: SpotifyPlaybackService) {
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
      const authToken = popup.location.hash.split('#access_token=')[1].split('&')[0];
      sessionStorage.setItem('spotifyToken', authToken)
      popup.close();
      setTimeout(() => {
        that.router.navigate(['home']);
        that.spotifyPlaybackService.setupPlayer();
      }, 100);
    };
  }

  logout(): void {
    sessionStorage.removeItem('spotifyToken')
    this.router.navigate(['login']);
    localStorage.clear();
  }

  getSpotifyToken(): string {
    return sessionStorage.getItem('spotifyToken');
  }

  generateRandomString(length): string {
    let text = '';
    const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
