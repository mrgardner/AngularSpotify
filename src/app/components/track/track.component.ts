import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Params } from 'src/app/interfaces/params/params.interface';
import { Track } from 'src/app/interfaces/track/track.interface';
import { UtilService } from 'src/app/services/util/util.service';

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
    public utilService: UtilService) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        if (params) {
          return this.spotifyService.getTrack(params.trackID);
        } else {
          return of();
        }
      })
    ).subscribe((track: Track) => this.track = track);
  }
}
