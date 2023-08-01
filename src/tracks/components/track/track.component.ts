// Common
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Interfaces
import { SortedTrack } from '@app/interfaces/track/track.interface';

// Services
import { SpotifyService } from '@app/services/spotify/spotify.service';
import { UtilService } from '@app/services/util/util.service';

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
      switchMap((params) => {
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
