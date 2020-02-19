import { TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { SpotifyPlaybackService } from './spotify-playback.service';
import { HttpClientModule } from '@angular/common/http';

describe('SpotifyPlaybackService', () => {
  let spotifyPlaybackService: SpotifyPlaybackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        SpotifyPlaybackService,
        {
          provide: Window, useValue: window
        }
      ]
    });

    spotifyPlaybackService = TestBed.inject(SpotifyPlaybackService);
  });

  afterEach(() => {
    spotifyPlaybackService = null;
    // TODO: Fix issue
    TestBed.inject(Window).Spotify = null;
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(spotifyPlaybackService).toBeTruthy();
  });

  it('should check waitForSpotifyWebPlaybackSDKToLoad method with Spotify object on window', fakeAsync(async () => {
    // TODO: Fix issue
    TestBed.inject(Window).Spotify = 'test';
    const result = await spotifyPlaybackService.waitForSpotifyWebPlaybackSDKToLoad();
    tick(10000);
    expect(result).toEqual('test');
    tick(10000);
    // TestBed.get(Window).Spotify = '';
  }));

  xit('should check waitForSpotifyWebPlaybackSDKToLoad method with Spotify object not on window', fakeAsync(async () => {
    // // TestBed.get(Window).Spotify = null;
    // TestBed.get(Window)['onSpotifyWebPlaybackSDKReady']('test');
    //
    window['onSpotifyWebPlaybackSDKReady']('test');
    const result = await spotifyPlaybackService.waitForSpotifyWebPlaybackSDKToLoad();
    tick(10000);
    expect(result).toEqual('test');
    tick(10000);
    // TestBed.get(Window).onSpotifyWebPlaybackSDKReady = () => new Promise(resolve => resolve(''));
    // // window['onSpotifyWebPlaybackSDKReady'] = () => new Promise(resolve => resolve(''))
    // // spyOn(window, 'onSpotifyWebPlaybackSDKReady')
    // TestBed.get(Window).Spotify = null;
    // tick(10000);
    // const result = await spotifyPlaybackService.waitForSpotifyWebPlaybackSDKToLoad();
    // tick(10000);
    // console.log(result);
    // expect(result).toEqual('test');
  }));

  it('should check setupPlayer method', fakeAsync(async () => {
    const t = class Player {
      constructor() {}
      on() {}
      connect() {}
    };
    spyOn(spotifyPlaybackService, 'waitForSpotifyWebPlaybackSDKToLoad').and.returnValue(new Promise(resolve => resolve({Player: t})));
    spotifyPlaybackService.setupPlayer();
    expect(spotifyPlaybackService).toBeTruthy();
  }));

  it('should check handleState with state returned and not paused', (async () => {
    const mockState = {
      paused: false,
      track_window: {
        current_track: {}
      }
    };
    spyOn(spotifyPlaybackService, 'waitForDeviceToBeSelected');
    const sendCurrentStateSpy = spyOn(spotifyPlaybackService, 'sendCurrentState');
    const currentTrackSpy = spyOn(spotifyPlaybackService, 'currentTrack');
    const showPlayButtonSpy = spyOn(spotifyPlaybackService, 'showPlayButton');
    await spotifyPlaybackService.handleState(mockState);
    expect(sendCurrentStateSpy).toHaveBeenCalledWith(mockState);
    expect(currentTrackSpy).toHaveBeenCalledWith({});
    expect(showPlayButtonSpy).toHaveBeenCalledWith(false);
  }));

  it('should check handleState with state returned and paused', (async () => {
    const mockState = {
      paused: true,
      track_window: {
        current_track: {}
      }
    };
    spyOn(spotifyPlaybackService, 'waitForDeviceToBeSelected');
    const clearStatePollingSpy = spyOn(spotifyPlaybackService, 'clearStatePolling');
    const currentTrackSpy = spyOn(spotifyPlaybackService, 'currentTrack');
    const showPlayButtonSpy = spyOn(spotifyPlaybackService, 'showPlayButton');
    await spotifyPlaybackService.handleState(mockState);
    expect(clearStatePollingSpy).toHaveBeenCalledWith();
    expect(currentTrackSpy).toHaveBeenCalledWith({
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
    expect(showPlayButtonSpy).toHaveBeenCalledWith(true);
  }));

  it('should check handleState with no state returned', (async () => {
    await spotifyPlaybackService.handleState(null);
    expect(spotifyPlaybackService.endOfChain).toBeTruthy();
  }));

  it('should check startStatePolling method', (async () => {
    jasmine.clock().install();
    spotifyPlaybackService.player = {
      getCurrentState: () => 'test'
    };
    spotifyPlaybackService.startStatePolling();
    jasmine.clock().tick(1001);
    expect(spotifyPlaybackService).toBeTruthy();
  }));


  it('should check clearStatePolling method', (() => {
    const spy = spyOn(window, 'clearInterval');
    spotifyPlaybackService.statePollingInterval = 1;
    spotifyPlaybackService.clearStatePolling();
    expect(spy).toHaveBeenCalledWith(1);
  }));

  it('should check createEventHandlers method pauseSong', (() => {
    spotifyPlaybackService.player = {
      on: () => {},
      pause: () => {}
    };
    const spy = spyOn(spotifyPlaybackService.player, 'pause');

    spotifyPlaybackService.createEventHandlers();
    spotifyPlaybackService.pauseSong$.emit();
    expect(spy).toHaveBeenCalled();
  }));

  it('should check createEventHandlers method playSong', (() => {
    spotifyPlaybackService.player = {
      on: () => {},
      resume: () => {}
    };
    const spy = spyOn(spotifyPlaybackService.player, 'resume');

    spotifyPlaybackService.createEventHandlers();
    spotifyPlaybackService.playSong$.emit();
    expect(spy).toHaveBeenCalled();
  }));

  it('should check createEventHandlers method nextSong', (() => {
    spotifyPlaybackService.player = {
      on: () => {},
      nextTrack: () => {}
    };
    const spy = spyOn(spotifyPlaybackService.player, 'nextTrack');

    spotifyPlaybackService.createEventHandlers();
    spotifyPlaybackService.nextSong$.emit();
    expect(spy).toHaveBeenCalled();
  }));

  it('should check createEventHandlers method previousSong', (() => {
    spotifyPlaybackService.player = {
      on: () => {},
      previousTrack: () => {}
    };
    const spy = spyOn(spotifyPlaybackService.player, 'previousTrack');

    spotifyPlaybackService.createEventHandlers();
    spotifyPlaybackService.previousSong$.emit();
    expect(spy).toHaveBeenCalled();
  }));

  it('should check createEventHandlers method setVolume', (() => {
    spotifyPlaybackService.player = {
      on: () => {},
      setVolume: () => {}
    };
    const spy = spyOn(spotifyPlaybackService.player, 'setVolume');

    spotifyPlaybackService.createEventHandlers();
    spotifyPlaybackService.setVolume$.emit();
    expect(spy).toHaveBeenCalled();
  }));

  fit('should check createEventHandlers method player.on initialization_error', (() => {
    spotifyPlaybackService.player = {
      on: () => {},
    };
    const spy = spyOn(spotifyPlaybackService.player, 'on');

    spotifyPlaybackService.createEventHandlers();
    spotifyPlaybackService.player.on('initialization_error', c => console.log(c));
    expect(spy).toHaveBeenCalled();
  }));

  it('should check waitForDeviceToBeSelected method with player and state', (() => {
    spotifyPlaybackService.player = {
      getCurrentState: () => new Promise(resolve => resolve({}))
    };
    const spy = spyOn(spotifyPlaybackService, 'startStatePolling');
    spotifyPlaybackService.waitForDeviceToBeSelected().then(res => {
      expect(res).toEqual({});
      expect(spy).toHaveBeenCalled();
    });
  }));

  it('should check waitForDeviceToBeSelected method with no player', (() => {
    spotifyPlaybackService.waitForDeviceToBeSelected().catch(err => {
      expect(err).toEqual('No Player');
    });
  }));

  it('should check waitForDeviceToBeSelected method with player and no state', (() => {
    spotifyPlaybackService.player = {
      getCurrentState: () => new Promise(resolve => resolve(null))
    };
    spotifyPlaybackService.waitForDeviceToBeSelected().catch(err => {
      expect(err).toEqual('No device state');
    });
  }));

  it('should check sendCurrentState method', () => {
    const mockSongState = {
      bitrate: 1,
      context: {
        metadata: {},
        uri: ''
      },
      disallows: {
        pausing: true,
        skipping_prev: true
      },
      duration: 1000,
      paused: true,
      position: 10000,
      repeat_mode: 0,
      restrictions: {
        disallow_pausing_reasons: [],
        disallow_skipping_prev_reasons: []
      },
      shuffle: true,
      timestamp: 0,
      track_window: {
        current_track: {
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
          isPlayButtonShowing: true,
          isPauseButtonShowing: true,
          remove: true,
          album_name: '',
          title: '',
          artist: '',
          time: '',
          addedAt: '',
          duration: 0
        },
        next_tracks: [],
        previous_tracks: []
      }
    };
    const spy = spyOn(spotifyPlaybackService.currentSongState$, 'emit');
    spotifyPlaybackService.sendCurrentState(mockSongState);
    expect(spy).toHaveBeenCalledWith(mockSongState);
  });

  it('should check playSong method', () => {
    const spy = spyOn(spotifyPlaybackService.playSong$, 'emit');
    spotifyPlaybackService.playSong();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should check pauseSong method', () => {
    const spy = spyOn(spotifyPlaybackService.pauseSong$, 'emit');
    spotifyPlaybackService.pauseSong();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should check nextSong method', () => {
    const spy = spyOn(spotifyPlaybackService.nextSong$, 'emit');
    spotifyPlaybackService.nextSong();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should check previousSong method', () => {
    const spy = spyOn(spotifyPlaybackService.previousSong$, 'emit');
    spotifyPlaybackService.previousSong();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should check showPlayButton method', () => {
    const spy = spyOn(spotifyPlaybackService.showPlayButton$, 'emit');
    spotifyPlaybackService.showPlayButton(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should check currentTrack method', () => {
    const mockTrack = {
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
      isPlayButtonShowing: true,
      isPauseButtonShowing: true,
      remove: true,
      album_name: '',
      title: '',
      artist: '',
      time: '',
      addedAt: '',
      duration: 0
    };
    const spy = spyOn(spotifyPlaybackService.currentTrack$, 'emit');
    spotifyPlaybackService.currentTrack(mockTrack);
    expect(spy).toHaveBeenCalledWith(mockTrack);
  });

  it('should check setVolume method', () => {
    const spy = spyOn(spotifyPlaybackService.setVolume$, 'emit');
    spotifyPlaybackService.setVolume(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
