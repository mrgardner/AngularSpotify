import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import querystring from 'query-string';
import {SpotifyService} from '../../services/spotify/spotify.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent {
  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {
    this.route.fragment.subscribe((fragment: string) => {
      const parsed = querystring.parse(fragment);
      if ('access_token' in parsed && 'expires_in' in parsed) {
        this.spotifyService.storeToken(parsed);
        this.spotifyService.setupPlayer(parsed['access_token']);
      }
    });
  }
}
