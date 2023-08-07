import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '@tracks/services/track/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-track-filter',
  templateUrl: './track-filter.component.html',
  styleUrls: ['./track-filter.component.scss']
})

export class TrackFilterComponent implements OnInit, OnDestroy {
  public isDuplicateTrack: boolean;
  public name: string;
  public track: string;
  public isSearchBoxShowing: boolean;
  public playlistID: string;
  public endOfChain: boolean;
  public routeSubscription: Subscription;
  public form = new UntypedFormGroup({
    track: new UntypedFormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService) { }

  ngOnInit(): void {
    this.isSearchBoxShowing = false;
    this.name = '';
    this.playlistID = '';
    this.routeSubscription = this.route.params.subscribe((params: any) => {
      if (params && params.playlistID) {
        this.playlistID = params.playlistID;
      } else {
        this.endOfChain = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  // TODO: FIX when input variables are fixed
  // checkForLocalTracks(): boolean {
  //   const that = this;
  //   const localTracks = that.tracks.filter(track => track['track']['is_local']);
  //   return localTracks.length > 0;
  // }

  checkForDuplicateTrack(event: Event): void {
    this.isDuplicateTrack = (<HTMLInputElement>event.target).checked;
    this.trackService.checkDuplicate((<HTMLInputElement>event.target).checked);
  }

  // TODO: FIX when input variables are fixed
  // removeDuplicates(): void {
  //   const that = this;
  //   that.isDuplicateTrack = false;
  //   that.trackService.checkDuplicate$.subscribe(isDuplicate => that.isDuplicateTrack = isDuplicate);
  //   const tracksToRemove = Array.from(this.selectedTracks['_selection']);
  //   const tt = tracksToRemove.map((a: SortedTrack) => {
  //     const index = that.tracks.indexOf(a);
  //     return {
  //       uri: a.uri,
  //       positions: [index]
  //     };
  //   });

  //   tracksToRemove.forEach(a => that.tracks.splice(that.tracks.indexOf(a), 1));

  //   that.route.params.subscribe(params => {
  //     // TODO: FIX without having to use getAuthToken()
  //     // that.spotifyService.removeDuplicateTracks(params['playlistID'], tt);
  //     that.isDuplicateTrack = false;
  //     this.trackService.checkDuplicate(false);
  //   });
  // }

  // TODO: FIX when input variables are fixed
  // shuffleSongs(): void {
  // const shuffledTracks = this.spotifyService.shuffleTracks(this.tracks);
  // TODO: FIX without having to use getAuthToken()
  // this.spotifyService.addShuffledTracksToPlaylist(this.playlistID, shuffledTracks).subscribe(() => {});
  //
  // this.route.params.pipe(switchMap(params => {
  //   return of();
  //
  // })).subscribe(() => {});
  // const that = this;
  // this.route.params.subscribe(params => {
  //   // this.originalTracks = this.tracks;
  //   this.trackService.addTrackToPlaylist(params['playlistID']);
  //   // const shuffledTracks = that.spotifyService.shuffleTracks(this.tracks);
  //   // that.spotifyService.shuffler(params['playlistID'], this.originalTracks);
  // });
  // }

  filterTrack(track: string): void {
    this.trackService.filterTrack(track);
  }
}