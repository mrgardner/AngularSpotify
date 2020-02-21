// Common
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Interfaces
import { SortedTrack } from '@interfaces/track/track.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  // TODO: Fix return types
  private readonly spotifyApiBaseURI: string;

  constructor(private _http: HttpClient) {
    this.spotifyApiBaseURI = 'https://api.spotify.com/v1';
  }

  getUser(): Observable<any> {
    const url = this.spotifyApiBaseURI + '/me';
    return this._http.get(url);
  }


  getAllPlaylists(morePlaylists?: string): Observable<any> {
    const url = morePlaylists ? morePlaylists : this.spotifyApiBaseURI + '/me/playlists?limit=50';
    return this._http.get(url);
  }

  getTrack(id: string): Observable<any> {
    return this._http.get(this.spotifyApiBaseURI + `/tracks/${id}`);
  }

  getTracksFromPlaylist(playlistID: string, offset: number, limit: number): Observable<any> {
    const trackOffset = offset * limit;
    const url = this.spotifyApiBaseURI + `/playlists/${playlistID}/tracks`;

    return this._http.get(url, {
      params: new HttpParams()
      .set('offset', trackOffset.toString())
      .set('limit', limit.toString()),
    });
  }

  getPlaylist(id: string): Observable<any> {
    return this._http.get(this.spotifyApiBaseURI + `/playlists/${id}`);
  }

  shuffleTracks(tracks: Array<SortedTrack>): Array<Object> {
    const array = tracks;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [ array[i], array[j] ] = [ array[j], array[i] ];
    }
    return array;
  }

  addTracksToPlaylist(owner: string, playlistID: string, tracksUris: Array<string>): Observable<any> {
    return this._http.put(this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/tracks`, {uris: tracksUris});
  }

  postTracksToPlaylist(owner: string, playlistID: string, tracksUris: Array<string>): Observable<any> {
    return this._http.post(this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/tracks`, {uris: tracksUris});
  }

  /*
    Need to figure out some logic to
      - Set max cap on how many tracks to include at once 100?
      - figure out logic to pull the next 100 tracks once you are at last track in last batch
      - same point as above but for previous tracks
  */

  playSpotifyTrack(tracks: Array<SortedTrack>, song: SortedTrack): Observable<any> {
    const uris = tracks.map((track: SortedTrack)  => track.uri);
    const offset = uris.indexOf(song.uri);

    return this._http.put(this.spotifyApiBaseURI + `/me/player/play?${localStorage.getItem('deviceId')}`,
    {uris, offset: {position: offset}});
  }

  setRepeatMode(context: string, deviceID: string): Observable<any> {
    return this._http.put(this.spotifyApiBaseURI + `/me/player/repeat?state=${context}&device_id=${deviceID}`, {});
  }

  getCurrentPlayer(): Observable<any> {
    return this._http.get(this.spotifyApiBaseURI + `/me/player`);
  }

  makeDeviceActive(deviceID: string): Observable<any> {
    return this._http.put(this.spotifyApiBaseURI + '/me/player', {device_ids: [deviceID], play: true});
  }

  getAvailableDevices(): Observable<any> {
    return this._http.get(this.spotifyApiBaseURI + `/me/player/devices`);
  }

  createPlaylist(body: any): Observable<any> {
    return this._http.post(this.spotifyApiBaseURI + `/me/playlists`, body);
  }

  uploadPlaylistCover(image: File, owner: string, playlistID: string): Observable<any> {
    return this._http.put(this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/images`, image);
  }

  createNewPlaylist(body: any, image: File): Observable<any> {
    return this.createPlaylist(body)
      .pipe(
        switchMap((data: Object) => this.uploadPlaylistCover(image, data['owner']['id'], data['id']))
      );
  }

  getUsersSavedAlbums(moreAlbums?: string): Observable<any> {
    const url = moreAlbums ? moreAlbums : this.spotifyApiBaseURI + `/me/albums`;
    return this._http.get(url);
  }

  replaceTrack(owner: string, playlistID: string, startIndex: number, endIndex: number): Observable<any> {
    const requestBody = {
      range_start: startIndex,
      insert_before: endIndex
    };
    const url = this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/tracks`;
    return this._http.put(url, requestBody);
  }

  mapTrackURIs(tracks: Array<SortedTrack>): Array<string> {
    return tracks.map((track: SortedTrack) => {
      return track.uri;
    });
  }

  // TODO: fix function to not have to use token
  // shuffler(playlistID, tracks) {
  //   let authToken = '';
  //   let playlistInfo = {};
  //   this.getAuthToken()
  //     .pipe(
  //       switchMap((token: string) => {
  //         authToken = token['token'];
  //         return this.playlistService.getSavedPlaylist(playlistID);
  //       }),
  //       switchMap(playlistData => {
  //         const originalTracks = [];
  //         const shuffledPlaylist = [];
  //         playlistInfo = playlistData;
  //         for (const t in tracks) {
  //           if (t) {
  //             originalTracks.push(tracks[t]);
  //           }
  //         }
  //         const shuffledTracks = this.shuffleTracks(tracks);
  //         for (let i = 0; i < originalTracks.length; i++) {
  //           for (let j = 0; j < shuffledTracks.length; j++) {
  //             if (originalTracks[i] === shuffledTracks[j]) {
  //               const playlist = {
  //                 name: playlistData['name'],
  //                 owner: {
  //                   id: playlistData['id']
  //                 },
  //                 id: playlistData['playlistID'],
  //                 tracks: {
  //                   total: playlistData['playlistLength']
  //                 }
  //               };
  //               const tuple = {
  //                 range_start: i,
  //                 insert_before: j,
  //                 name: originalTracks[i]['track']['name']
  //               };
  //               // shuffledPlaylist.push(this.replaceTrack(authToken, playlistData['owner'], playlistData['playlistID'], i, j));
  //               this.playlistService.didPlaylistChange$.emit(true);
  //               // this.playlistService.savePlaylist(playlist, tuple);
  //               // return this.replaceTrack(authToken, playlistData['owner'], playlistData['playlistID'], i, j);
  //             }
  //           }
  //         }
  //         return concat(...[]);
  //       })
  //     ).subscribe((data) => {
  //       this.playlistService.didPlaylistChange$.emit(false);
  //     });
  // }

  // TODO: fix function to not have to use token
  // addShuffledTracksToPlaylist(playlistID, tracks) {
  //   let authToken = '';
  //   const that = this;
  //   const trackURIs = this.mapTrackURIs(tracks);
  //   let amountOfLoops = 0;
  //   let playlistInfo = {};
  //   return this.getAuthToken()
  //     .pipe(
  //       switchMap(token => {
  //         authToken = token['token'];
  //         return that.playlistService.getSavedPlaylist(playlistID);
  //       }),
  //       switchMap(data => {
  //         playlistInfo = data;
  //         return that.addTracksToPlaylist(playlistInfo['owner'], playlistInfo['playlistID'], []);
  //       }),
  //       switchMap(() => {
  //         const tempList = [];
  //         amountOfLoops = Math.ceil(playlistInfo['playlistLength'] / 100);
  //         for (let i = amountOfLoops - 1; i >= 0; i--) {
  //           const tt = trackURIs.slice(i * 100, ((i + 1) * 100));
  //           tempList.unshift(that.postTracksToPlaylist(authToken, playlistInfo['owner'], playlistInfo['playlistID'], tt));
  //         }
  //         return concat(...tempList);
  //       })
  //     );
  // }

  removeTracks(owner: string, playlistID: string, tracks: Array<SortedTrack>): Observable<any> {
    const options = {
      headers: null,
      body: tracks
    };
    return this._http.delete(
      this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/tracks`, options);
  }

  // TODO: fix function to not have to use token
  // removeDuplicateTracks(playlistID, tracks) {
  //   const that = this;
  //   let authToken = '';
  //   let playlistInfo = {};
  //   this.getAuthToken()
  //     .pipe(
  //       switchMap(token => {
  //         authToken = token['token'];
  //         return that.playlistService.getSavedPlaylist(playlistID);
  //       }),
  //       switchMap(data => {
  //         playlistInfo = data;
  //         return that.removeTracks(authToken, playlistInfo['owner'], playlistInfo['playlistID'], {tracks});
  //       }),
  //     ).subscribe(() => {});
  // }
}
