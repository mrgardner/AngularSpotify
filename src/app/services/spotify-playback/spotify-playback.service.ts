import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  public showPlayButton$: EventEmitter<boolean>;
  public test$: EventEmitter<any>;
  public test2$: EventEmitter<any>;
  public test3$: EventEmitter<any>;
  public currentTrack$: EventEmitter<any>;
  private player: any;
  private statePollingInterval: any = null;
  constructor(private _http: HttpClient, private cookieService: CookieService) {
    this.spotifyApiBaseURI = 'https://api.spotify.com/v1';
    this.currentTrackPosition$ = new EventEmitter();
    this.currentSongState$ = new EventEmitter();
    this.playSong$ = new EventEmitter();
    this.pauseSong$ = new EventEmitter();
    this.nextSong$ = new EventEmitter();
    this.showPlayButton$ = new EventEmitter();
    this.previousSong$ = new EventEmitter();
    this.test$ = new EventEmitter();
    this.test2$ = new EventEmitter();
    this.test3$ = new EventEmitter();
    this.currentTrack$ = new EventEmitter();
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
    (async () => {
      const Player = await this.waitForSpotifyWebPlaybackSDKToLoad();

      // create a new player
      this.player = new Player['Player']({
        name: 'Testing123',
        getOAuthToken: cb => { cb(this.cookieService.get('spotifyToken')); },
      });
      // // set up the player's event handlers
      this.createEventHandlers();

      // // finally, connect!
      this.player.connect();
    })();
  }

  async handleState(state) {
    if (state) {
      if (!state.paused) {
        this.test3(state);
        this.currentTrack(state.track_window.current_track);
        this.showPlayButton(false);
      } else {
        this.clearStatePolling();
        this.showPlayButton(true);
        this.currentTrack({track: {name: ''}});
        await this.waitForDeviceToBeSelected();
      }
    }
  }

  startStatePolling() {
    this.statePollingInterval = setInterval(async () => {
      const state = await this.player.getCurrentState();
      await this.handleState(state);
    }, 1000);
  }

  clearStatePolling() {
    clearInterval(this.statePollingInterval);
  }

  createEventHandlers() {
    // problem setting up the player
    this.player.on('initialization_error', e => { console.error(e); });
    // problem authenticating the user.
    // either the token was invalid in the first place,
    // or it expired (it lasts one hour)
    this.player.on('authentication_error', e => console.error(e));
    // currently only premium accounts can use the API
    this.player.on('account_error', e => { console.error(e); });
    // loading/playing the track failed for some reason
    this.player.on('playback_error', e => { console.error(e); });
    // Playback status updates
    this.player.on('player_state_changed', async state => await this.handleState(state));
    // Ready
    this.player.on('ready', async data => {
      const { device_id } = data;
      this.startStatePolling();
      localStorage.setItem('deviceId', device_id);
      // set the deviceId variable, then let's try
      // to swap music playback to *our* player!
      this.transferPlaybackHere();
    });

    this.pauseSong$.subscribe(() => this.player.pause());
    this.playSong$.subscribe(() => this.player.resume());
    this.nextSong$.subscribe(() => this.player.nextTrack());
    this.previousSong$.subscribe(() => this.player.previousTrack());
  }

  waitForDeviceToBeSelected() {
    return new Promise(resolve => {
      if (this.player) {
        this.player.getCurrentState().then(state => {
          if (state !== null) {
            this.startStatePolling();
            resolve(state);
          }
        });
      }
    });
  }

  transferPlaybackHere() {
    // https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
    fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${this.cookieService.get('spotifyToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'device_ids': [localStorage.getItem('deviceId')],
        // true: start playing music if it was paused on the other device
        // false: paused if paused on other device, start playing music otherwise
        'play': true,
      }),
    });
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

  test3(state) {
    return this.test3$.emit(state);
  }

  showPlayButton(value: boolean) {
    this.showPlayButton$.emit(value);
  }

  currentTrack(value) {
    this.currentTrack$.emit(value);
  }
}
