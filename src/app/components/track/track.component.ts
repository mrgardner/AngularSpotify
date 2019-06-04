import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {of} from 'rxjs';
import {TrackService} from '../../services/track/track.service';
import { Params } from 'src/app/interfaces/params/params.interface';
import { Track } from 'src/app/interfaces/track/track.interface';
import { Artist } from 'src/app/interfaces/artist/artist.interface';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  public track: Object;
  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private trackService: TrackService,
    private location: Location) {}

  ngOnInit() {
    // let trackParams: Params  = {
    //   playlistID: '',
    //   trackID: ''
    // };
    // TODO: FIX without having to use getAuthToken()
    // this.route.params.pipe(
    //   switchMap((params: Params) => {
    //     trackParams = params;
    //     if (params) {
    //       return this.spotifyService.getAuthToken();
    //     } else {
    //       return of();
    //     }
    //   }),
    //   switchMap((token: SpotifyToken) => {
    //     const isLoggedIn = !!token.token;
    //     if (isLoggedIn) {
    //       return this.spotifyService.getTrack(token.token, trackParams.trackID);
    //     } else {
    //       return of();
    //     }
    //   })
    // ).subscribe((track: Track) => this.track = track);
  }

  displayArtist(artist: Array<Artist>): Array<string> {
    return this.trackService.displayArtists(artist);
  }

  goBack(): void {
    this.location.back();
  }
}
