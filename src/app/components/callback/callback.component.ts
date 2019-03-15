import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { parse } from 'query-string';
import {SpotifyService} from '../../services/spotify/spotify.service';
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
    private spotifyPlaybackService: SpotifyPlaybackService,
    private cookieService: CookieService,
    private router: Router) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      const parsed = parse(fragment);

      if ('access_token' in parsed && 'expires_in' in parsed) {
        const expiredDate = new Date();
        expiredDate.setHours(expiredDate.getHours() + 1);
        // @ts-ignore
        this.cookieService.set('spotifyToken', parsed.access_token, expiredDate);
        this.router.navigate(['']);
        this.spotifyPlaybackService.setupPlayer();
      }
    });
  }
}
