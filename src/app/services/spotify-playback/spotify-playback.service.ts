import { Injectable, EventEmitter } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { SpotifySongResponse } from 'src/app/interfaces/song/spotify-song-response.interface';
import { CookieService } from 'ngx-cookie-service';
import prettyMs from 'pretty-ms';

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
  private player: any;
  private playerCheckInterval: any;
  private statePollingInterval: any = null;
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
      if (window.Spotify) {
        resolve(window.Spotify);
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve(window.Spotify);
        };
      }
    });
  }

  setupPlayer() {
    (async () => {
      const Player = await this.waitForSpotifyWebPlaybackSDKToLoad();

      // const t = await this.waitForSpotifyWebPlaybackSDKToLoad();
      console.log('The Web Playback SDK has loaded.');

      // if (window['Spotify'] !== null) {
      console.log('dsfdfdsf');
      // cancel the interval
      // clearInterval(this.playerCheckInterval);
      // this.playerCheckInterval = 0;
      // create a new player
      this.player = new Player['Player']({
        name: 'Testing123',
        getOAuthToken: cb => { cb(this.cookieService.get('spotifyToken')); },
      });
      // // set up the player's event handlers
      this.createEventHandlers();

      // // finally, connect!
      this.player.connect();
      // }
    })();
    // this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    // this.checkForPlayer();
    // console.log('fsdf');
    // (async () => {
    //   let counter = 0;
    //   const t = await this.waitForSpotifyWebPlaybackSDKToLoad();
    //   const sdk = new t['Player']({
    //     name: 'Web Playback SDK',
    //     volume: 1.0,
    //     getOAuthToken: callback => { callback(this.cookieService.get('spotifyToken')); }
    //   });
    //   sdk.on('player_state_changed', state => {
    //     console.log('ggg');
    //     console.log(state)
    //     if (state !== null) {
    //       console.log('ff')
    //     }
    //     counter++;
    //     if (counter % 3 === 1) {
    //       this.sendCurrentState(state);
    //     }

    //     if (state['paused'] && state['position'] !== 0) {
    //       this.currentPositionOfTrack(state['position']);
    //     }
    //   });

    //    // Ready
    //    sdk.addListener('ready', ({device_id}) => {
    //      console.log('sdfsdf');
    //      localStorage.setItem('deviceId', device_id);
    //     this.makeDeviceActive(device_id).subscribe(() => {
    //       console.log('sdfs');
    //       // this.playlistService.saveDeviceID(device_id);
    //     });
    //   });
    //   sdk.connect();

    //   this.pauseSong$.subscribe(() => sdk.pause());
    //   this.playSong$.subscribe(() => sdk.resume());
    //   this.nextSong$.subscribe(() => sdk.nextTrack());
    //   this.previousSong$.subscribe(() => sdk.previousTrack());
    // })();
  }

  async handleState(state) {
    if (state) {
      if (!state.paused) {
        console.log(prettyMs(state.position, {secondsDecimalDigits: 0}));
      } else {
        this.clearStatePolling();
      }
    } else {
      // let {
      //   _options: { id: device_id }
      // } = this.webPlaybackInstance;
      // onPlayerWaitingForDevice({ device_id });
      // await this.waitForDeviceToBeSelected();
      // onPlayerDeviceSelected();
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
    console.log('TEST');
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
      console.log('Let the music play on!');
      console.log(device_id);
      localStorage.setItem('deviceId', device_id);
      // set the deviceId variable, then let's try
      // to swap music playback to *our* player!
      this.transferPlaybackHere();
    });
  }

  onStateChanged(state) {
    // only update if we got a real state
    if (state !== null) {
      console.log(state);
      // console.log(this.playerCheckInterval)
    }
  }

  checkForPlayer() {
    // if the Spotify SDK has loaded
    if (window['Spotify'] !== null) {
      console.log('dsfdfdsf');
      // cancel the interval
      // clearInterval(this.playerCheckInterval);
      // this.playerCheckInterval = 0;
      // create a new player
      this.player = new window['Spotify'].Player({
        name: 'Testing123',
        getOAuthToken: cb => { cb(this.cookieService.get('spotifyToken')); },
       // Ready
      //  sdk.addListener('ready', ({device_id}) => {
      //   // this.makeDeviceActive(token, device_id).subscribe(() => {
      //   //   this.playlistService.saveDeviceID(device_id);
      //   // });
      });
      // set up the player's event handlers
      this.createEventHandlers();

      // finally, connect!
      this.player.connect();
    }
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
}
