import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import querystring from 'querystring';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {PlaylistService} from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent {

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, private playlistService: PlaylistService) {
    this.route.fragment.subscribe(fragment => {
      const parsed = querystring.parse(fragment);
      if ('access_token' in parsed && 'expires_in' in parsed) {
        this.spotifyService.storeToken(parsed);
        this.spotifyService.setupPlayer(parsed['access_token']);
      }
    });
  }
}
