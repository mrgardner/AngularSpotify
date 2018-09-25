import {Component, Input, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {ActivatedRoute} from '@angular/router';
import {TrackService} from '../../services/track/track.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-track-filter',
  templateUrl: './track-filter.component.html',
  styleUrls: ['./track-filter.component.scss']
})

export class TrackFilterComponent implements OnInit{
  @Input('tracks') tracks: Array<Object>;
  public isDuplicateTrack: boolean;
  public name: string;
  public artist: string;
  private originalTracks: Array<Object>;
  public isSearchBoxShowing: boolean;
  private playlistID: string;

  constructor(private spotifyService: SpotifyService, private route: ActivatedRoute, private trackService: TrackService, private playlistService: PlaylistService) {
    // const that = this;
    // that.trackService.updateTracks$.subscribe(data => {this.tracks = data; console.log(data); });
    this.isSearchBoxShowing = false;
    this.name = '';
  }

  ngOnInit() {
    this.playlistID = '';
    this.route.params.subscribe(params => this.playlistID = params['playlistID']);
  }

  checkForLocalTracks() {
    const that = this;
    const localTracks = that.tracks.filter(track => track['track']['is_local']);
    return localTracks.length > 0;
  }

  checkForDuplicateTrack(e) {
    this.isDuplicateTrack = e.target.checked;
    this.trackService.checkDuplicate(e.target.checked);
  }

  removeDuplicates() {
    const that = this;
    that.isDuplicateTrack = false;
    that.trackService.checkDuplicate$.subscribe(isDuplicate => that.isDuplicateTrack = isDuplicate);
    const tracksToRemove = [];
    const t = that.tracks.filter(a => a['remove']);
    const tt = t.map(a => {
      const index = that.tracks.indexOf(a);
      tracksToRemove.push(a);
      return {
        uri: a['track']['uri'],
        positions: [index]
      };
    });

    tracksToRemove.forEach(a => that.tracks.splice(that.tracks.indexOf(a), 1));

    that.route.params.subscribe(params => {
      that.spotifyService.removeDuplicateTracks(params['playlistID'], tt);
      that.isDuplicateTrack = false;
      this.trackService.checkDuplicate(false);
    });
  }

  shuffleSongs() {
    console.log(this.playlistID);
    const shuffledTracks = this.spotifyService.shuffleTracks(this.tracks);
    this.spotifyService.addShuffledTracksToPlaylist(this.playlistID, shuffledTracks).subscribe(() => {});
    //
    // this.route.params.pipe(switchMap(params => {
    //   console.log(params)
    //   return of();
    //
    // })).subscribe(() => {});
    // const that = this;
    // this.route.params.subscribe(params => {
    //   // this.originalTracks = this.tracks;
    //   // console.log(this.originalTracks[0]['track']['name']);
    //   this.trackService.addTrackToPlaylist(params['playlistID']);
    //   // const shuffledTracks = that.spotifyService.shuffleTracks(this.tracks);
    //   // console.log(shuffledTracks[0]['track']['name']);
    //   // that.spotifyService.shuffler(params['playlistID'], this.originalTracks);
    // });
  }

  filterName(name) {
    this.trackService.filterByTrackName(name);
  }

  filterArtist(artist) {
    this.trackService.filterByTrackArtist(artist);
  }

  showSearchBox() {
    console.log('SHOULD NOT SHOW')
    this.isSearchBoxShowing = true;
  }

  hideSearchBox() {
    // if (this.isSearchBoxShowing) {
      console.log('sdff')
      this.name = '';
      this.filterName('');
      this.isSearchBoxShowing = false;
      console.log(this.isSearchBoxShowing)
    // }
  }

  onLoseFocus() {
    console.log(this.name)
    console.log(this.name.length)
    if (this.name.length === 0){
      this.hideSearchBox();
    }
  }
}
