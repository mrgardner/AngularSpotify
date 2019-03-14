import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { parse } from 'query-string';
import {SpotifyService} from '../../services/spotify/spotify.service';
import { SpotifyPlaybackService } from 'src/app/services/spotify-playback/spotify-playback.service';
/* "bootstrap": "^4.1.1",
    "core-js": "^2.5.4",
    "firebase": "^5.0.4",
    "parse-ms": "^2.0.0",
    "pretty-ms": "^3.2.0",
    "querystring": "^0.2.0",
*/
@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private spotifyPlaybackService: SpotifyPlaybackService) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      const parsed = parse(fragment);
      if ('access_token' in parsed && 'expires_in' in parsed) {
        this.spotifyService.storeToken(parsed);
        this.spotifyPlaybackService.setupPlayer(parsed['access_token']);
      }
    });
  }
}
