import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import querystring from 'query-string';
import {SpotifyService} from '../../services/spotify/spotify.service';
import { SpotifyPlaybackService } from 'src/app/services/spotify-playback/spotify-playback.service';

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
      const parsed = querystring.parse(fragment);
      if ('access_token' in parsed && 'expires_in' in parsed) {
        this.spotifyService.storeToken(parsed);
        this.spotifyPlaybackService.setupPlayer(parsed['access_token']);
      }
    });
  }
}
