import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      if (fragment.split('access_token=').length === 2 && fragment.split('access_token=')[1].split('&').length === 4) {
        const authToken = fragment.split('access_token=')[1].split('&')[0];
        const expiredDate = new Date();
        expiredDate.setHours(expiredDate.getHours() + 1);
        this.cookieService.set('spotifyToken', authToken, expiredDate);
        if (authToken) {
          window.opener.spotifyCallback(authToken);
        }
      }
    });
  }
}
