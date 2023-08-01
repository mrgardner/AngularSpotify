// Common 
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '@app/store';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {
  public _window: Window;
  // public routeSubscrition: Subscription;

  constructor(private store: Store) {
    // this._window = window;
  }

  ngOnInit(): void {
    // TODO: FIX SELECTORS
    this.store.dispatch(AuthApiActions.login());

    // this.routeSubscrition = this.route.fragment.subscribe((fragment: string) => {

    //   if (fragment.split(SPOTIFY_AUTH.ACCESS_TOKEN).length === 2 && fragment.split(SPOTIFY_AUTH.ACCESS_TOKEN)[1].split('&').length === 4) {
    //     const authToken: string = fragment.split(SPOTIFY_AUTH.ACCESS_TOKEN)[1].split('&')[0];
    //     const expiredDate: Date = new Date();
    //     expiredDate.setHours(expiredDate.getHours() + 1);
    //     sessionStorage.setItem(SPOTIFY_AUTH.SPOTIFY_TOKEN, authToken)
    //     this._window.opener.spotifyCallback(authToken);
    //   }
    // });
  }

  // ngOnDestroy(): void {
  //   this.routeSubscrition.unsubscribe();
  // }
}