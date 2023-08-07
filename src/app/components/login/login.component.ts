import { Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login(): void {
    const authState = this.generateRandomString(16);
    const query =
      `response_type=${environment.spotify.loginResponseType}` +
      `&client_id=${environment.spotify.clientID}` +
      `&scope=${environment.spotify.scope}` +
      `&redirect_uri=${environment.spotify.redirectURI}` +
      `&state=${authState}`;
    const loginURI = environment.spotify.authURI + query;

    location.href = loginURI;
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