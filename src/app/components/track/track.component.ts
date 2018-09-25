import { Component } from '@angular/core';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {of} from 'rxjs';
import {TrackService} from '../../services/track/track.service';
import {PreviousRouteService} from '../../services/previous-route/previous-route.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent {
  public track: Object;
  constructor(private spotifyService: SpotifyService, private route: ActivatedRoute, private trackService: TrackService, private previousRouteService: PreviousRouteService, private location: Location) {
    const that = this;
    let trackParams = {};
    that.route.params.pipe(
      switchMap(params => {
        trackParams = params;
        if (params) {
          return that.spotifyService.getAuthToken();
        } else {
          return of();
        }
      }),
      switchMap(token => {
        const isLoggedIn = !!token['token'];
        if (isLoggedIn) {
          return that.spotifyService.getTrack(token['token'], trackParams['trackID']);
        } else {
          return of();
        }
      })
    ).subscribe(data => that.track = data);
  }

  displayArtist(artist) {
    return this.trackService.displayArtists(artist);
  }

  goBack() {
    this.location.back();
  }
}
