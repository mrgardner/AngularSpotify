import { Injectable, EventEmitter } from '@angular/core';
import { SpotifySongResponse } from '../../interfaces/song/spotify-song-response.interface';
import { UtilService } from '../util/util.service';
import { SpotifyService } from '../spotify/spotify.service';
import { Track } from '../../interfaces/track/track.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlaybackService {
  public currentSongState$: EventEmitter<any>;
  public playSong$: EventEmitter<any>;
  public pauseSong$: EventEmitter<any>;
  public nextSong$: EventEmitter<any>;
  public previousSong$: EventEmitter<any>;
  public showPlayButton$: EventEmitter<boolean>;
  public currentTrack$: EventEmitter<any>;
  public setVolume$: EventEmitter<number>;
  private player: any;
  private statePollingInterval: any = null;
  constructor(private utilService: UtilService, private spotifyService: SpotifyService) {
    this.currentSongState$ = new EventEmitter();
    this.playSong$ = new EventEmitter();
    this.pauseSong$ = new EventEmitter();
    this.nextSong$ = new EventEmitter();
    this.showPlayButton$ = new EventEmitter();
    this.previousSong$ = new EventEmitter();
    this.currentTrack$ = new EventEmitter();
    this.setVolume$ = new EventEmitter();
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
    const body = document.getElementsByTagName('body')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    body.appendChild(script);

    (async () => {
      const Player = await this.waitForSpotifyWebPlaybackSDKToLoad();

      // create a new player
      this.player = new Player['Player']({
        name: 'Testing123',
        getOAuthToken: cb => { cb(this.utilService.getCookie('spotifyToken')); },
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
        this.sendCurrentState(state);
        this.currentTrack(state.track_window.current_track);
        this.showPlayButton(false);
      } else {
        this.clearStatePolling();
        this.showPlayButton(true);
        this.currentTrack({
          album: {
            album_type: '',
            artists: [],
            available_markets: [],
            external_urls: {
              spotify: ''
            },
            href: '',
            id: '',
            images: [],
            name: '',
            release_date: '',
            release_date_precision: '',
            total_track: 0,
            type: '',
            uri: ''
          },
          artists: [],
          available_markets: [],
          disc_number: 0,
          duration_ms: 0,
          explicit: true,
          external_ids: {
            isrc: ''
          },
          external_urls: {
            spotify: ''
          },
          href: '',
          id: '',
          name: '',
          popularity: 0,
          preview_url: '',
          track_number: 0,
          type: '',
          uri: '',
          isPlayButtonShowing: false,
          isPauseButtonShowing: false,
          remove: false,
          album_name: '',
          title: '',
          artist: '',
          time: '',
          addedAt: '',
          duration: 0
        });
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
      this.spotifyService.makeDeviceActive(device_id).subscribe((t) => console.log(t));
    });

    this.pauseSong$.subscribe(() => this.player.pause());
    this.playSong$.subscribe(() => this.player.resume());
    this.nextSong$.subscribe(() => this.player.nextTrack());
    this.previousSong$.subscribe(() => this.player.previousTrack());
    this.setVolume$.subscribe((value: number) => this.player.setVolume(value));
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

  showPlayButton(value: boolean) {
    this.showPlayButton$.emit(value);
  }

  currentTrack(value: Track) {
    this.currentTrack$.emit(value);
  }

  setVolume(value: number) {
    this.setVolume$.emit(value);
  }
}
