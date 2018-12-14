import { Injectable, EventEmitter } from '@angular/core';
import { PlaylistService } from '../playlist/playlist.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TrackService } from '../track/track.service';
import { SpotifySongResponse } from 'src/app/interfaces/song/spotify-song-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlaybackService {
  private spotifyApiBaseURI: string;
  public currentTrackPosition$: EventEmitter<number>;
  public currentSongState$: EventEmitter<any>;
  constructor(private playlistService: PlaylistService, private _http: HttpClient, private trackService: TrackService) {
    this.spotifyApiBaseURI = 'https://api.spotify.com/v1';
    this.currentTrackPosition$ = new EventEmitter();
    this.currentSongState$ = new EventEmitter();
  }

  async waitForSpotifyWebPlaybackSDKToLoad () {
    return new Promise(resolve => {
      if (window['Spotify']) {
        resolve(window['Spotify']);
      } else {
        window['onSpotifyWebPlaybackSDKReady'] = () => {
          resolve(window['Spotify']);
        };
      }
    });
  }

  setupPlayer(token) {
    const head = document.getElementsByTagName('body')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/assets/spotify-playback.js';
    head.appendChild(script);

    (async () => {
      let counter = 0;
      const t = await this.waitForSpotifyWebPlaybackSDKToLoad();
      const sdk = new t['Player']({
        name: 'Web Playback SDK',
        volume: 1.0,
        getOAuthToken: callback => { callback(token); }
      });
      sdk.on('player_state_changed', state => {
        counter++;
        if (counter === 1) {
          this.sendCurrentState(state);
        }
        if (state['paused'] === true) {
          counter = 0;
        }

        if (state['paused'] && state['position'] !== 0) {
          this.currentPositionOfTrack(state['position']);
        }
      });

       // Ready
       sdk.addListener('ready', ({device_id}) => {
        this.makeDeviceActive(token, device_id).subscribe(() => {
          this.playlistService.saveDeviceID(device_id);
        });
      });

      sdk.connect();
    })();
  }

  makeDeviceActive(token, deviceID) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(this.spotifyApiBaseURI + '/me/player', {device_ids: [deviceID]}, httpOptions);
  }

  currentPositionOfTrack(position: number) {
    this.currentTrackPosition$.emit(position);
  }

  sendCurrentState(state: SpotifySongResponse) {
    this.currentSongState$.emit(state);
  }
}
