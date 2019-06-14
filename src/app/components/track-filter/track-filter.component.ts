import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {TrackService} from '../../services/track/track.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import { Track } from '../../interfaces/track/track.interface';

@Component({
  selector: 'app-track-filter',
  templateUrl: './track-filter.component.html',
  styleUrls: ['./track-filter.component.scss']
})

export class TrackFilterComponent implements OnInit {
  // TODO: FIX
  // @Input('tracks') tracks: Array<Object>;
  // @Input('selectedTracks') selectedTracks: Array<Object>;
  public isDuplicateTrack: boolean;
  public name: string;
  public artist: string;
  private originalTracks: Array<Object>;
  public isSearchBoxShowing: boolean;
  private playlistID: string;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private trackService: TrackService,
    private playlistService: PlaylistService) {}

  ngOnInit() {
    this.isSearchBoxShowing = false;
    this.name = '';
    this.playlistID = '';
    this.route.params.subscribe(params => this.playlistID = params['playlistID']);
  }

  // TODO: FIX when input variables are fixed
  // checkForLocalTracks(): boolean {
  //   const that = this;
  //   const localTracks = that.tracks.filter(track => track['track']['is_local']);
  //   return localTracks.length > 0;
  // }

  checkForDuplicateTrack(e: any): void {
    this.isDuplicateTrack = e.target.checked;
    this.trackService.checkDuplicate(e.target.checked);
  }

  // TODO: FIX when input variables are fixed
  // removeDuplicates(): void {
  //   const that = this;
  //   that.isDuplicateTrack = false;
  //   that.trackService.checkDuplicate$.subscribe(isDuplicate => that.isDuplicateTrack = isDuplicate);
  //   const tracksToRemove = Array.from(this.selectedTracks['_selection']);
  //   const tt = tracksToRemove.map((a: Track) => {
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

  shuffleSongs(): void {
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
  }

  filterName(name: string): void {
    this.trackService.filterByTrackName(name);
  }

  filterArtist(artist: string): void {
    this.trackService.filterByTrackArtist(artist);
  }

  showSearchBox(): void {
    this.isSearchBoxShowing = true;
  }

  hideSearchBox(): void {
    // if (this.isSearchBoxShowing) {
      this.name = '';
      this.filterName('');
      this.isSearchBoxShowing = false;
    // }
  }

  onLoseFocus(): void {
    if (this.name.length === 0) {
      this.hideSearchBox();
    }
  }
}
