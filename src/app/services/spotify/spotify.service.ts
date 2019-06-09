import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly spotifyApiBaseURI: string;

  constructor(private _http: HttpClient) {
    this.spotifyApiBaseURI = 'https://api.spotify.com/v1';
  }

  getUser() {
    const url = this.spotifyApiBaseURI + '/me';
    return this._http.get(url);
  }


  getAllPlaylists(morePlaylists?) {
    const url = morePlaylists ? morePlaylists : this.spotifyApiBaseURI + '/me/playlists?limit=50';
    return this._http.get(url);
  }

  getTrack(id) {
    return this._http.get(this.spotifyApiBaseURI + `/tracks/${id}`);
  }

  getTracksFromPlaylist(playlistID, offset, limit) {
    const t = offset * limit;
    const url = this.spotifyApiBaseURI + `/playlists/${playlistID}/tracks`;

    return this._http.get(url, {
      params: new HttpParams()
      .set('offset', t.toString())
      .set('limit', limit.toString()),
    });
  }

  getPlaylist(id: string) {
    return this._http.get(this.spotifyApiBaseURI + `/playlists/${id}`);
  }

  shuffleTracks(tracks) {
    const array = tracks;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [ array[i], array[j] ] = [ array[j], array[i] ];
    }
    return array;
  }

  addTracksToPlaylist(owner, playlistID, tracks) {
    return this._http.put(this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/tracks`, tracks);
  }

  postTracksToPlaylist(owner, playlistID, tracks) {
    return this._http.post(this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/tracks`, tracks);
  }

  /*
    Need to figure out some logic to
      - Set max cap on how many tracks to include at once 100?
      - figure out logic to pull the next 100 tracks once you are at last track in last batch
      - same point as above but for previous tracks
  */
  playSpotifyTrack(tracks,  offset, deviceID,) {
    return this._http.put(this.spotifyApiBaseURI + `/me/player/play?${deviceID}`,
    {uris: tracks, offset: {position: offset}});
  }

  pauseSpotifyTrack(deviceID) {
    return this._http.put(this.spotifyApiBaseURI + `/me/player/pause?${deviceID}`, {});
  }

  setRepeatMode(context, deviceID) {
    return this._http.put(this.spotifyApiBaseURI + `/me/player/repeat?state=${context}&device_id${deviceID}`, {});
  }

  changeSpotifyTrackVolume(deviceID, volume) {
    return this._http.put(this.spotifyApiBaseURI + `/me/player/volume?volume_percent=${volume}&device_id=${deviceID}`, {});
  }

  getCurrentPlayer() {
    return this._http.get(this.spotifyApiBaseURI + `/me/player`);
  }

  getAvailableDevices() {
    return this._http.get(this.spotifyApiBaseURI + `/me/player/devices`);
  }

  getCurrentSong() {
    return this._http.get(this.spotifyApiBaseURI + `/me/player/currently-playing`);
  }

  createPlaylist(body) {
    return this._http.post(this.spotifyApiBaseURI + `/me/playlists`, body);
  }

  uploadPlaylistCover(image: File, owner: string, playlistID: string) {
    return this._http.put(this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/images`, image);
  }
  // TODO: fix function to not have to use token
  // createNewPlaylist(body, image) {
  //   let authToken = '';
  //   return this.getAuthToken()
  //     .pipe(
  //       switchMap((token: string) => {
  //         authToken = token['token'];
  //         return this.createPlaylist(authToken, body);
  //       }),
  //       switchMap((data: Object) => this.uploadPlaylistCover(authToken, image, data['owner']['id'], data['id']))
  //     );
  // }

  getUsersSavedAlbums(moreAlbums?) {
    const url = moreAlbums ? moreAlbums : this.spotifyApiBaseURI + `/me/albums`;
    return this._http.get(url);
  }

  replaceTrack(owner: string, playlistID: string, startIndex: number, endIndex: number) {
    const requestBody = {
      range_start: startIndex,
      insert_before: endIndex
    };
    const url = this.spotifyApiBaseURI + `/users/${owner}/playlists/${playlistID}/tracks`;
    return this._http.put(url, requestBody);
  }

  mapTrackURIs(tracks) {
    return tracks.map(track => {
      return track.track.uri;
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
  //         return that.addTracksToPlaylist(authToken, playlistInfo['owner'], playlistInfo['playlistID'], {uris: []});
  //       }),
  //       switchMap(() => {
  //         const tempList = [];
  //         amountOfLoops = Math.ceil(playlistInfo['playlistLength'] / 100);
  //         for (let i = amountOfLoops - 1; i >= 0; i--) {
  //           const tt = trackURIs.slice(i * 100, ((i + 1) * 100));
  //           tempList.unshift(that.postTracksToPlaylist(authToken, playlistInfo['owner'], playlistInfo['playlistID'], {uris: tt}));
  //         }
  //         return concat(...tempList);
  //       })
  //     );
  // }

  removeTracks(owner, playlistID, tracks) {
    const options = {
      headers: new HttpHeaders({}),
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

  checkSavedTrack(trackIDs) {
    return this._http.get(this.spotifyApiBaseURI + `/me/tracks/contains?ids=${trackIDs}`);
  }
}
