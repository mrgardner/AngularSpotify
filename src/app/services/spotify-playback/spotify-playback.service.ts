import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SpotifySongResponse } from 'src/app/interfaces/song/spotify-song-response.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlaybackService {
  private spotifyApiBaseURI: string;
  public currentTrackPosition$: EventEmitter<number>;
  public currentSongState$: EventEmitter<any>;
  public playSong$: EventEmitter<any>;
  public pauseSong$: EventEmitter<any>;
  public nextSong$: EventEmitter<any>;
  public previousSong$: EventEmitter<any>;
  public test$: EventEmitter<any>;
  public test2$: EventEmitter<any>;
  constructor(private _http: HttpClient, private cookieService: CookieService) {
    this.spotifyApiBaseURI = 'https://api.spotify.com/v1';
    this.currentTrackPosition$ = new EventEmitter();
    this.currentSongState$ = new EventEmitter();
    this.playSong$ = new EventEmitter();
    this.pauseSong$ = new EventEmitter();
    this.nextSong$ = new EventEmitter();
    this.previousSong$ = new EventEmitter();
    this.test$ = new EventEmitter();
    this.test2$ = new EventEmitter();
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

  setupPlayer() {
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
        getOAuthToken: callback => { callback(this.cookieService.get('token')); }
      });
      sdk.on('player_state_changed', state => {
        counter++;
        if (counter % 3 === 1) {
          this.sendCurrentState(state);
        }

        if (state['paused'] && state['position'] !== 0) {
          this.currentPositionOfTrack(state['position']);
        }
      });

       // Ready
       sdk.addListener('ready', ({device_id}) => {
         localStorage.setItem('deviceId', device_id);
        // this.makeDeviceActive(token, device_id).subscribe(() => {
        //   this.playlistService.saveDeviceID(device_id);
        // });
      });

      sdk.connect();

      this.pauseSong$.subscribe(() => sdk.pause());
      this.playSong$.subscribe(() => sdk.resume());
      this.nextSong$.subscribe(() => sdk.nextTrack());
      this.previousSong$.subscribe(() => sdk.previousTrack());
    })();
  }

  makeDeviceActive(deviceID) {
    return this._http.put(this.spotifyApiBaseURI + '/me/player', {device_ids: [deviceID]});
  }

  currentPositionOfTrack(position: number) {
    this.currentTrackPosition$.emit(position);
  }

  sendCurrentState(state: SpotifySongResponse) {
    this.currentSongState$.emit(state);
  }

  playSong() {
    this.playSong$.emit();
  }

  pauseSong() {
    this.pauseSong$.emit();
  }

  nextSong() {
    this.nextSong$.emit();
  }

  previousSong() {
    this.previousSong$.emit();
  }

  test(track) {
    return this.test$.emit(track);
  }

  test2() {
    return this.test2$.emit();
  }
}
