import { EventEmitter, Injectable } from '@angular/core';
import { PlaylistService } from '../playlist/playlist.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  public checkDuplicate$: EventEmitter<any>;
  public filterTrackName$: EventEmitter<any>;
  public filterTrackArtist$: EventEmitter<any>;
  public updateTracks$: EventEmitter<any>;
  public areTracksLoading$: EventEmitter<any>;
  public areTracksLoaded$: EventEmitter<any>;
  public currentTrack$: EventEmitter<any>;
  public trackTime$: EventEmitter<any>;
  public currentlyPlaying$: EventEmitter<any>;

  constructor(private playlistService: PlaylistService) {
    this.checkDuplicate$ = new EventEmitter();
    this.filterTrackName$ = new EventEmitter();
    this.filterTrackArtist$ = new EventEmitter();
    this.updateTracks$ = new EventEmitter();
    this.areTracksLoading$ = new EventEmitter();
    this.areTracksLoaded$ = new EventEmitter();
    this.currentTrack$ = new EventEmitter();
    this.trackTime$ = new EventEmitter();
    this.currentlyPlaying$ = new EventEmitter();
  }

  areTracksLoading(isLoading: boolean) {
    this.areTracksLoading$.emit(isLoading);
  }

  areTracksLoaded(areTracksLoaded: boolean) {
    this.areTracksLoaded$.emit(areTracksLoaded);
  }

  setCurrentTrack(track: Object) {
    this.currentTrack$.emit(track);
  }

  setTrackTime(value: boolean) {
    this.trackTime$.emit(value);
  }

  checkDuplicate(value: boolean) {
    this.checkDuplicate$.emit(value);
  }

  filterByTrackName(trackNameString) {
    this.filterTrackName$.emit(trackNameString);
  }

  filterByTrackArtist(trackArtistString) {
    this.filterTrackArtist$.emit(trackArtistString);
  }

  // updateTracks(tracks) {
  //   this.updateTracks$.emit(tracks);
  // }

  // getAllTracksFromPlaylist(route) {
  //   let token = '';
  //   let loggedIn = false;
  //   let playlist = {};
  //   return this.spotifyService.getAuthToken()
  //     .pipe(
  //       switchMap(spotifyToken => {
  //         token = spotifyToken['token'];
  //         loggedIn = !!token;
  //         if (loggedIn) {
  //           return route.params;
  //         } else {
  //           this.areTracksLoading(false);
  //           return of();
  //         }
  //
  //       }),
  //       switchMap(params => {
  //         return this.playlistService.getSavedPlaylist(params['playlistID']);
  //       }),
  //       switchMap(playlistInfo => {
  //         this.areTracksLoading(true);
  //         this.areTracksLoaded(false);
  //         playlist = playlistInfo;
  //         const tempList = [];
  //         if (playlist && loggedIn) {
  //           const owner = playlist['owner'];
  //           const playlistID = playlist['playlistID'];
  //           const playlistLength = playlist['playlistLength'];
  //           const numberOfTimesToLoop = Math.ceil(playlistLength / 100);
  //           for (let i = 0; i < numberOfTimesToLoop; i++) {
  //             const baseURI = `https://api.spotify.com/v1/users/${owner}/playlists/${playlistID}/tracks?offset=${i * 100}&limit=100`;
  //             tempList.push(this.spotifyService.getAllTracksFromPlaylist(owner, playlistID, token, baseURI));
  //           }
  //           return concat(...tempList);
  //         } else {
  //           this.areTracksLoading(false);
  //           return of();
  //         }
  //       })
  //     );
  // }

  currentlyPlaying(state: any) {
    this.currentlyPlaying$.emit(state);
  }

  filterDuplicateTracks(tracks, args) {
    const getNotUnique = (array) => {
      const map = new Map();
      const map2 = new Map();
      const map3 = new Map();
      array.forEach(a => map.set(a.title, (map.get(a.title) || 0) + 1));
      const t = array.filter(a => map.get(a.title) > 1);
      t.forEach(a => map2.set(a.duration, (map2.get(a.duration) || 0) + 1));
      const tt = t.filter(a => map2.get(a.duration) > 1);
      tt.forEach(a => map3.set(a.title, (map3.get(a.title) || 0) + 1));
      const ttt = tt.filter(a => map3.get(a.title) > 1);
      ttt.forEach(a => a['remove'] = false);
      return ttt.sort(function(a, b) {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    };
    if (args) {
      return getNotUnique(tracks);
    }
    return tracks;
  }
}
