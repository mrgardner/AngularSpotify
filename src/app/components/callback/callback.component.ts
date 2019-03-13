import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
    private spotifyService: SpotifyService,
    private spotifyPlaybackService: SpotifyPlaybackService,
    private cookieService: CookieService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(t => console.log(t));
    this.route.fragment.subscribe((fragment: string) => {
      const parsed = parse(fragment);
      if ('access_token' in parsed && 'expires_in' in parsed) {
        this.spotifyService.storeToken(parsed);
        this.spotifyPlaybackService.setupPlayer(parsed['access_token']);
      }
    });
  }
}
