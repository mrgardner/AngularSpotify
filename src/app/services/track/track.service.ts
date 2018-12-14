import {EventEmitter, Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {first, last, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PlaylistService} from '../playlist/playlist.service';

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
  private isPlaylistsBeingDeleted: boolean;
  public currentlyPlaying$: EventEmitter<any>;

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth, private playlistService: PlaylistService) {
    this.checkDuplicate$ = new EventEmitter();
    this.filterTrackName$ = new EventEmitter();
    this.filterTrackArtist$ = new EventEmitter();
    this.updateTracks$ = new EventEmitter();
    this.areTracksLoading$ = new EventEmitter();
    this.areTracksLoaded$ = new EventEmitter();
    this.currentTrack$ = new EventEmitter();
    this.trackTime$ = new EventEmitter();
    this.currentlyPlaying$ = new EventEmitter();
    this.playlistService.deletingPlaylists$.subscribe(value => this.isPlaylistsBeingDeleted = value);
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

  nowPlaying(track: Object) {
    this.afa.user.subscribe(user => {
      if (user) {
        this.afs.collection('users').doc(user['email']).collection('currentTrack').doc('nowPlaying').update({currentTrack: track});
      }
    });
  }

  getNowPlaying() {
    return this.afa.user.pipe(
      switchMap(user => {
      if (user) {
        return this.afs.collection('users').doc(user['email']).collection('currentTrack').doc('nowPlaying').valueChanges();
      } else {
        return of();
      }
      }),
      switchMap(data => {
        if (data) {
          return [data['currentTrack']];
        } else {
          return ['Nothing is currently playing'];
        }
      })
    );
  }

  displayArtists(artists) {
    const numberOfArtists = artists.length;
    return artists.map((artist, i) => {
      let artistString = '';
      if (numberOfArtists > 1) {
        if (numberOfArtists - 1 === i) {
          artistString += artist.name;
        } else {
          artistString += `${artist.name}, `;
        }
      }  else {
        artistString = artist.name;
      }
      return artistString;
    });
  }

  addTrackToPlaylist(playlistID) {
    this.afa.user.subscribe(user => {
      if (user) {
        this.afs.collection('users').doc(user['email']).collection('playlists').doc(playlistID).collection('tracks').add({test: 'TESTING'});
      }
    });
  }

  saveTrack(playlistID, track, index) {
    let userObject = {};
    this.afa.user.pipe(
      switchMap(user => {
        userObject = user;
        if (user) {
          return this.afs.collection('users').doc(userObject['email'])
            .collection('playlists').doc(playlistID).collection('tracks').doc(track.track.id).valueChanges();
        } else {
          return of();
        }
      })
    ).subscribe(data => {
      if (!this.isPlaylistsBeingDeleted) {
        const mappedArtists = track.track.artists.map(artist => {
          return {artist: artist.name};
        });
        const trackData = {
          name: track.track.name,
          currentIndex: index,
          artists: mappedArtists
        };
        if (!data) {
          this.afs.collection('users').doc(userObject['email'])
            .collection('playlists').doc(playlistID).collection('tracks').doc(track.track.id).set({trackData});
        } else {
          this.afs.collection('users').doc(userObject['email'])
            .collection('playlists').doc(playlistID).collection('tracks').doc(track.track.id).update({trackData});
        }
      }
    });
  }

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
}
