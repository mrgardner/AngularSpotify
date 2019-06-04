import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'query-string';
import { SpotifyPlaybackService } from 'src/app/services/spotify-playback/spotify-playback.service';
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
      const parsed = parse(fragment);

      if ('access_token' in parsed && 'expires_in' in parsed) {
        const expiredDate = new Date();
        expiredDate.setHours(expiredDate.getHours() + 1);
        // @ts-ignore
        this.cookieService.set('spotifyToken', parsed.access_token, expiredDate);
        if (parsed.access_token) {
          window.opener.spotifyCallback(parsed.access_token);
        }
      }
    });
  }
}
