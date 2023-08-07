import { EventEmitter, Injectable } from '@angular/core';
import { SpotifySongResponse } from '@app/interfaces/song/song.interface';
import { SortedTrack } from '@app/interfaces/track/track.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlaybackService {
  public currentSongState$: EventEmitter<SpotifySongResponse>;
  public playSong$: EventEmitter<void>;
  public pauseSong$: EventEmitter<void>;
  public nextSong$: EventEmitter<void>;
  public previousSong$: EventEmitter<void>;
  public showPlayButton$: EventEmitter<boolean>;
  public currentTrack$: EventEmitter<SortedTrack>;
  public setVolume$: EventEmitter<number>;
  public currentPlaylistPlaying$: EventEmitter<string>;
  // TODO: Fix type
  public player: any;
  public statePollingInterval = 0;
  public endOfChain: boolean;
  constructor() {
    this.currentSongState$ = new EventEmitter();
    this.playSong$ = new EventEmitter();
    this.pauseSong$ = new EventEmitter();
    this.nextSong$ = new EventEmitter();
    this.showPlayButton$ = new EventEmitter();
    this.previousSong$ = new EventEmitter();
    this.currentTrack$ = new EventEmitter();
    this.setVolume$ = new EventEmitter();
    this.currentPlaylistPlaying$ = new EventEmitter();
  }

  async waitForSpotifyWebPlaybackSDKToLoad() {
    return new Promise(resolve => {
      // const window: 
      if ((window as any)['Spotify']) {
        resolve((window as any)['Spotify']);
      } else {
        (window as any)['onSpotifyWebPlaybackSDKReady'] = () => {
          resolve((window as any)['Spotify']);
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
      const Player: any = await this.waitForSpotifyWebPlaybackSDKToLoad();

      // create a new player
      this.player = new Player['Player']({
        name: 'Testing123',
        volume: 1,
        getOAuthToken: (cb: any) => { cb(sessionStorage.getItem('spotifyToken')); },
      });
      // set up the player's event handlers
      // TODO: fix below
      // this.createEventHandlers();

      //finally, connect!
      this.player.connect();
    })();
  }

  async handleState(state: any) {
    if (state) {
      if (!state.paused) {
        this.sendCurrentState(state);
        this.currentTrack(state.track_window.current_track);
        this.showPlayButton(false);
      } else {
        this.clearStatePolling();
        this.showPlayButton(true);
        this.currentTrack({
          title: '',
          artist: '',
          album_name: '',
          added_at: '',
          time: 0,
          showPlayButton: false,
          showPauseButton: false,
          showTrackNumber: true,
          duration: 0,
          uri: '',
          total: 0,
          size: 0,
          filterText: '',
          remove: false,
          artists: [],
          name: '',
          is_local: false,
          track: null
        });
        await this.waitForDeviceToBeSelected();
      }
    } else {
      this.endOfChain = true;
    }
  }

  startStatePolling() {
    this.statePollingInterval = window.setInterval(async () => {
      const state = await this.player.getCurrentState();
      await this.handleState(state);
    }, 1000);
  }

  clearStatePolling() {
    window.clearInterval(this.statePollingInterval);
  }

  createEventHandlers() {
    // problem setting up the player
    this.player.on('initialization_error', (e: any) => { console.error(e); });
    // problem authenticating the user.
    // either the token was invalid in the first place,
    // or it expired (it lasts one hour)
    this.player.on('authentication_error', (e: any) => console.error(e));
    // currently only premium accounts can use the API
    this.player.on('account_error', (e: any) => { console.error(e); });
    // loading/playing the track failed for some reason
    this.player.on('playback_error', (e: any) => { console.error(e); });
    // Playback status updates
    this.player.on('player_state_changed', async (state: any) => await this.handleState(state));
    // Ready
    this.player.on('ready', async (data: any) => {
      const { device_id } = data;
      this.startStatePolling();
      localStorage.setItem('deviceId', device_id);
      // set the deviceId variable, then let's try
      // to swap music playback to *our* player!
      // TODO: Make sure to eventually enable the line below
      // this.spotifyService.makeDeviceActive(device_id).subscribe(() => {});
    });

    this.pauseSong$.subscribe(() => this.player.pause());
    this.playSong$.subscribe(() => this.player.resume());
    this.nextSong$.subscribe(() => this.player.nextTrack());
    this.previousSong$.subscribe(() => this.player.previousTrack());
    this.setVolume$.subscribe((value: number) => this.player.setVolume(value));
  }

  waitForDeviceToBeSelected() {
    return new Promise((resolve, reject) => {
      if (this.player) {
        this.player.getCurrentState().then((state: any) => {
          if (state !== null) {
            this.startStatePolling();
            resolve(state);
          } else {
            reject('No device state');
          }
        });
      } else {
        reject('No Player');
      }
    });
  }

  sendCurrentState(state: SpotifySongResponse) {
    this.currentSongState$.emit(state);
  }

  currentPlaylistPlaying(playlistId: string) {
    this.currentPlaylistPlaying$.emit(playlistId);
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

  currentTrack(value: SortedTrack) {
    this.currentTrack$.emit(value);
  }

  setVolume(value: number) {
    this.setVolume$.emit(value);
  }
}