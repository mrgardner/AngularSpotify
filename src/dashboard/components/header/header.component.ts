// Common
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '@app/services/auth/auth.service';
import { SpotifyPlaybackService } from '@app/services/spotify-playback/spotify-playback.service';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
    private spotifyPlaybackService: SpotifyPlaybackService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.spotifyPlaybackService.setupPlayer();
    }

    const message$ = fromEvent<StorageEvent>(window, "storage").pipe(
      filter(event => event.storageArea === sessionStorage),
      filter(event => event.key === "spotifyToken"),
      map(event => event.newValue)
    );

    message$.subscribe(token => {
      if (token === null || token === undefined) {
        this.router.navigate(['login']);
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this.authService.getSpotifyToken();
  }

  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
  }
}
