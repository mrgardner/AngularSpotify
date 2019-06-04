import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showDeviceModal: boolean;
  constructor(private authService: AuthService) {
    console.log('sdfasdasdfsdfbhasd');
    this.showDeviceModal = false;
  }

  isLoggedIn() {
    return !!this.authService.getSpotifyToken();
  }
}
