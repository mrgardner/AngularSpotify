import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: Remove after logic is added to ngrx effects
  // login(): void {
  //   const that = this;
  //   const popup: Window | null = window.open(
  //     this.loginURI,
  //     'Login with Spotify',
  //     'width=800, height=800'
  //   );

  //   (window as any)['spotifyCallback'] = () => {
  //     const authToken = popup !== null ? popup.location.hash.split('#access_token=')[1].split('&')[0] : "";
  //     sessionStorage.setItem('spotifyToken', authToken);
  //     if (popup !== null) {
  //       popup.close();
  //     }
  //     setTimeout(() => {
  //       that.router.navigate(['dashboard']);
  //       that.spotifyPlaybackService.setupPlayer();
  //     }, 100);
  //   };
  // }

  // logout(): void {
  //   sessionStorage.removeItem('spotifyToken')
  //   this.router.navigate(['login']);
  //   localStorage.clear();
  // }

  getSpotifyToken(): string | null {
    return sessionStorage.getItem('spotifyToken');
  }

  generateRandomString(length: number): string {
    let text = '';
    const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}