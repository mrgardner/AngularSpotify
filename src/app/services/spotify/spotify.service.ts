import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {stringify} from 'query-string';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {concat, of} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrackService} from '../track/track.service';
import {PlaylistService} from '../playlist/playlist.service';
import {environment} from '../../../environments/environment';
import {DeviceModalService} from '../deviceModal/device-modal.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly spotifyApiBaseURI: string;
  private didPlaylistChange: boolean;

  constructor(private _http: HttpClient, private router: Router,
              private afs: AngularFirestore,
              private afa: AngularFireAuth,
              private trackService: TrackService,
              private route: ActivatedRoute,
              private playlistService: PlaylistService,
              private deviceModalService: DeviceModalService,
              private cookieService: CookieService) {
    this.spotifyApiBaseURI = 'https://api.spotify.com/v1';
    this.playlistService.didPlaylistChange$.subscribe(value => this.didPlaylistChange = value);
    this.didPlaylistChange = false;
  }

  // getLoginURI() {
  //   return this.loginURI;
  // }
  // login() {
  //    window.location.href = this.getLoginURI();
  // }

  getUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cookieService.get('spotifyToken')}`
      })
    };
    const url = this.spotifyApiBaseURI + '/me';
    return this._http.get(url, httpOptions);
  }

  storeToken(token) {
    const expireTime = new Date();
    expireTime.setMinutes(expireTime.getMinutes() + (token['expires_in'] / 60));
    this.afa.user
      .subscribe(user => {
        if (user) {
          this.afs.collection('users').doc(user['email']).update({spotifyToken: {token: token.access_token, expires: String(expireTime)}});
        }
    });
    this.router.navigate(['/']);
  }

  getAuthToken() {
    return this.afa.user.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.collection('users').doc(user['email']).valueChanges();
        } else {
          return of();
        }
      }),
      switchMap(token => {
        const currentTime = new Date();
        if (token) {
          // @ts-ignore
          if (token.spotifyToken.expires < String(currentTime)) {
            this.logout();
          }
          return [token['spotifyToken']];
        } else {
          return of();
        }
      })
    );
  }

  getAllPlaylists(morePlaylists?) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cookieService.get('spotifyToken')}`
      })
    };
    const url = morePlaylists ? morePlaylists : this.spotifyApiBaseURI + '/me/playlists?limit=50';
    return this._http.get(url, httpOptions);
  }

  getTrack(token, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this._http.get(this.spotifyApiBaseURI + `/tracks/${id}`, httpOptions);
  }

  getTracksFromPlaylist(playlistID, offset, limit) {
    const t = offset * limit;
    const url = this.spotifyApiBaseURI + `/playlists/${playlistID}/tracks`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get('spotifyToken')}`
    });
    return this._http.get(url, {
      params: new HttpParams()
      .set('offset', t.toString())
      .set('limit', limit.toString()),
      headers
    });
  }

  getPlaylist(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cookieService.get('spotifyToken')}`
      })
    };
    return this._http.get(this.spotifyApiBaseURI + `/playlists/${id}`, httpOptions);
  }

  shuffleTracks(tracks) {
    const array = tracks;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [ array[i], array[j] ] = [ array[j], array[i] ];
    }
    return array;
  }

  addTracksToPlaylist(token, owner, playlistID, tracks) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this._http.put(this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/tracks`, tracks, httpOptions);
  }

  postTracksToPlaylist(token, owner, playlistID, tracks) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this._http.post(this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/tracks`, tracks, httpOptions);
  }

  /*
    Need to figure out some logic to
      - Set max cap on how many tracks to include at once 100?
      - figure out logic to pull the next 100 tracks once you are at last track in last batch
      - same point as above but for previous tracks
  */
  playSpotifyTrack(token, tracks,  offset, deviceID, currentPosition) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(this.spotifyApiBaseURI + `/me/player/play?${deviceID}`,
    {uris: tracks, position_ms: currentPosition, offset: {position: offset}}, httpOptions);
  }

  pauseSpotifyTrack(token, deviceID) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(this.spotifyApiBaseURI + `/me/player/pause?${deviceID}`, {}, httpOptions);
  }

  setRepeatMode(token, context, deviceID) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(this.spotifyApiBaseURI + `/me/player/repeat?state=${context}&device_id${deviceID}`, {}, httpOptions);
  }

  changeSpotifyTrackVolume(token, deviceID, volume) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(this.spotifyApiBaseURI + `/me/player/volume?volume_percent=${volume}&device_id=${deviceID}`, {}, httpOptions);
  }

  getCurrentPlayer(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(this.spotifyApiBaseURI + `/me/player`, httpOptions);
  }

  getAvailableDevices(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(this.spotifyApiBaseURI + `/me/player/devices`, httpOptions);
  }

  getCurrentSong(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(this.spotifyApiBaseURI + `/me/player/currently-playing`, httpOptions);
  }

  createPlaylist(token, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(this.spotifyApiBaseURI + `/me/playlists`, body, httpOptions);
  }

  uploadPlaylistCover(token: string, image: File, owner: string, playlistID: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'image/jpeg'
      })
    };
    return this._http.put(this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/images`, image, httpOptions);
  }

  createNewPlaylist(body, image) {
    let authToken = '';
    return this.getAuthToken()
      .pipe(
        switchMap((token: string) => {
          authToken = token['token'];
          return this.createPlaylist(authToken, body);
        }),
        switchMap((data: Object) => this.uploadPlaylistCover(authToken, image, data['owner']['id'], data['id']))
      );
  }

  getUsersSavedAlbums(token, moreAlbums?) {
    const url = moreAlbums ? moreAlbums : this.spotifyApiBaseURI + `/me/albums`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(url, httpOptions);
  }

  replaceTrack(token: string, owner: string, playlistID: string, startIndex: number, endIndex: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    const requestBody = {
      range_start: startIndex,
      insert_before: endIndex
    };
    const url = this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/tracks`;
    return this._http.put(url, requestBody, httpOptions);
  }

  mapTrackURIs(tracks) {
    return tracks.map(track => {
      return track.track.uri;
    });
  }

  shuffler(playlistID, tracks) {
    let authToken = '';
    let playlistInfo = {};
    this.getAuthToken()
      .pipe(
        switchMap((token: string) => {
          authToken = token['token'];
          return this.playlistService.getSavedPlaylist(playlistID);
        }),
        switchMap(playlistData => {
          const originalTracks = [];
          const shuffledPlaylist = [];
          playlistInfo = playlistData;
          for (const t in tracks) {
            if (t) {
              originalTracks.push(tracks[t]);
            }
          }
          const shuffledTracks = this.shuffleTracks(tracks);
          for (let i = 0; i < originalTracks.length; i++) {
            for (let j = 0; j < shuffledTracks.length; j++) {
              if (originalTracks[i] === shuffledTracks[j]) {
                const playlist = {
                  name: playlistData['name'],
                  owner: {
                    id: playlistData['id']
                  },
                  id: playlistData['playlistID'],
                  tracks: {
                    total: playlistData['playlistLength']
                  }
                };
                const tuple = {
                  range_start: i,
                  insert_before: j,
                  name: originalTracks[i]['track']['name']
                };
                // shuffledPlaylist.push(this.replaceTrack(authToken, playlistData['owner'], playlistData['playlistID'], i, j));
                this.playlistService.didPlaylistChange$.emit(true);
                // this.playlistService.savePlaylist(playlist, tuple);
                // return this.replaceTrack(authToken, playlistData['owner'], playlistData['playlistID'], i, j);
              }
            }
          }
          return concat(...[]);
        })
      ).subscribe((data) => {
        this.playlistService.didPlaylistChange$.emit(false);
      });
  }

  addShuffledTracksToPlaylist(playlistID, tracks) {
    let authToken = '';
    const that = this;
    const trackURIs = this.mapTrackURIs(tracks);
    let amountOfLoops = 0;
    let playlistInfo = {};
    return this.getAuthToken()
      .pipe(
        switchMap(token => {
          authToken = token['token'];
          return that.playlistService.getSavedPlaylist(playlistID);
        }),
        switchMap(data => {
          playlistInfo = data;
          return that.addTracksToPlaylist(authToken, playlistInfo['owner'], playlistInfo['playlistID'], {uris: []});
        }),
        switchMap(() => {
          const tempList = [];
          amountOfLoops = Math.ceil(playlistInfo['playlistLength'] / 100);
          for (let i = amountOfLoops - 1; i >= 0; i--) {
            const tt = trackURIs.slice(i * 100, ((i + 1) * 100));
            tempList.unshift(that.postTracksToPlaylist(authToken, playlistInfo['owner'], playlistInfo['playlistID'], {uris: tt}));
          }
          return concat(...tempList);
        })
      );
  }

  removeTracks(token, owner, playlistID, tracks) {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      body: tracks
    };
    return this._http.delete(
      this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/tracks`, options);
  }

  removeDuplicateTracks(playlistID, tracks) {
    const that = this;
    let authToken = '';
    let playlistInfo = {};
    this.getAuthToken()
      .pipe(
        switchMap(token => {
          authToken = token['token'];
          return that.playlistService.getSavedPlaylist(playlistID);
        }),
        switchMap(data => {
          playlistInfo = data;
          return that.removeTracks(authToken, playlistInfo['owner'], playlistInfo['playlistID'], {tracks});
        }),
      ).subscribe(() => {});
  }

  checkSavedTrack(token, trackIDs) {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    return this._http.get(
      this.spotifyApiBaseURI + `/me/tracks/contains?ids=${trackIDs}`, options);
  }

  logout() {
    this.afa.user.subscribe(user => {
      if (user) {
        this.afs.collection('users').doc(user['email']).update({spotifyToken: {token: '', expires: null}})
          .then(() => this.playlistService.deletePlaylists());
      }
    });
  }
}
