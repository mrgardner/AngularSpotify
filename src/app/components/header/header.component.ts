import { Component, OnInit } from '@angular/core';
import { SpotifyPlaybackService } from '../../services/spotify-playback/spotify-playback.service';
import { AuthService } from '../../services/auth/auth.service';

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
    private spotifyPlaybackService: SpotifyPlaybackService) {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.spotifyPlaybackService.setupPlayer();
    }
  }

  isLoggedIn(): boolean {
    return !!this.authService.getSpotifyToken();
  }

  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
  }
}
