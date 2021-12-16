// Common
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Interfaces
import { Params } from '@interfaces/params/params.interface';
import { SortedTrack } from '@interfaces/track/track.interface';

// Services
import { SpotifyService } from '@services/spotify/spotify.service';
import { UtilService } from '@services/util/util.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit, OnDestroy {
  public track: SortedTrack;
  public endOfChain: boolean;
  public routeSubscription: Subscription;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    public utilService: UtilService) { }

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
    ).subscribe((track: SortedTrack) => this.track = track);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
