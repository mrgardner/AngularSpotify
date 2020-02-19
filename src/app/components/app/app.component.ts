import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showDeviceModal: boolean;

  constructor(private authService: AuthService) {
    this.showDeviceModal = false;
  }

  isLoggedIn(): boolean {
    return !!this.authService.getSpotifyToken();
  }
}
