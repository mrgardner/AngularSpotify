import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public loggedIn: boolean;
  public isLoggedIn: boolean;

  constructor(private router: Router, private spotifyService: SpotifyService, private authService: AuthService) {}
  ngOnInit() {
    this.spotifyService.getAuthToken().subscribe(token => {
      this.loggedIn = !!token['token'];
      this.spotifyService.setupPlayer(token['token']);
    });
    this.authService.isAuthenticated().subscribe(data => this.isLoggedIn = !!data);
  }

  loginSpotify() {
    this.spotifyService.login();
  }

  logoutOfSpotify() {
    this.spotifyService.logout();
  }

  logout() {
    this.authService.logout();
  }
}
