// Common 
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
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
      if (fragment.split('access_token=').length === 2 && fragment.split('access_token=')[1].split('&').length === 4) {
        const authToken: string = fragment.split('access_token=')[1].split('&')[0];
        const expiredDate: Date = new Date();
        expiredDate.setHours(expiredDate.getHours() + 1);
        sessionStorage.setItem('spotifyToken', authToken)
        this._window.opener.spotifyCallback(authToken);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscrition.unsubscribe();
  }
}
