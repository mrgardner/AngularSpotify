import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { Params } from '../../interfaces/params/params.interface';
import { Track } from '../../interfaces/track/track.interface';
import { UtilService } from '../../services/util/util.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit, OnDestroy {
  public track: Track;
  public endOfChain: boolean;
  public routeSubscription: Subscription;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    public utilService: UtilService) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.pipe(
      switchMap((params: Params) => {
        if (params && params.trackID) {
          return this.spotifyService.getTrack(params.trackID);
        } else {
          this.endOfChain = true;
          return of();
        }
      })
    ).subscribe((track: Track) => this.track = track);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
