import {Component} from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private spotifyService: SpotifyService, private authService: AuthService) {}

  login(): void {
    // this.spotifyService.login();
    this.authService.login();
  }
}
