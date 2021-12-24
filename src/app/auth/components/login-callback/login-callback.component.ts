// Common 
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SPOTIFY_AUTH } from '@auth/constants/auth.constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class CallbackComponent implements OnInit, OnDestroy {
  public _window: Window;
  public routeSubscrition: Subscription;

  constructor(
    private route: ActivatedRoute) {
    this._window = window;
  }

  ngOnInit(): void {
    this.routeSubscrition = this.route.fragment.subscribe((fragment: string) => {

      if (fragment.split(SPOTIFY_AUTH.ACCESS_TOKEN).length === 2 && fragment.split(SPOTIFY_AUTH.ACCESS_TOKEN)[1].split('&').length === 4) {
        const authToken: string = fragment.split(SPOTIFY_AUTH.ACCESS_TOKEN)[1].split('&')[0];
        const expiredDate: Date = new Date();
        expiredDate.setHours(expiredDate.getHours() + 1);
        sessionStorage.setItem(SPOTIFY_AUTH.SPOTIFY_TOKEN, authToken)
        this._window.opener.spotifyCallback(authToken);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscrition.unsubscribe();
  }
}
