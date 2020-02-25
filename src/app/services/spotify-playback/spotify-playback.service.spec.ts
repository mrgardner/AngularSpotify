// Common
import { HttpClientModule } from '@angular/common/http';

// Services
import { SpotifyPlaybackService } from '@services/spotify-playback/spotify-playback.service';

// Testing Core
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

// Testing Data
import { mockSongState } from '@test-data/song/song.test-data';
import { mockSortedTrack } from '@test-data/tracks/tracks.test-data';
import { mockPlayer } from '@test-data/player/player.test-data';
import { mockSpotifyWindow } from '@test-data/window/window.test-data';

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
    TestBed.inject(Window).Spotify = null;
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(spotifyPlaybackService).toBeTruthy();
  });

  it('should check waitForSpotifyWebPlaybackSDKToLoad method with Spotify object on window', fakeAsync(async () => {
    TestBed.inject(Window).Spotify = mockSpotifyWindow;
    const result = await spotifyPlaybackService.waitForSpotifyWebPlaybackSDKToLoad();
    tick(10000);
    expect(result).toEqual(mockSpotifyWindow);
    tick(10000);
  }));

  xit('should check waitForSpotifyWebPlaybackSDKToLoad method with Spotify object not on window', fakeAsync(async () => {
    const result = await spotifyPlaybackService.waitForSpotifyWebPlaybackSDKToLoad();
    tick(10000);
    expect(result).toEqual(mockSpotifyWindow);
    tick(10000);
  }));

  it('should check setupPlayer method', fakeAsync(async () => {
    spyOn(spotifyPlaybackService, 'waitForSpotifyWebPlaybackSDKToLoad').and.returnValue(new Promise(resolve => resolve(mockSpotifyWindow)));
    spotifyPlaybackService.setupPlayer();
    expect(spotifyPlaybackService).toBeTruthy();
  }));

  it('should check handleState with state returned and not paused', (async () => {
    spyOn(spotifyPlaybackService, 'waitForDeviceToBeSelected');
    const sendCurrentStateSpy = spyOn(spotifyPlaybackService, 'sendCurrentState');
    const currentTrackSpy = spyOn(spotifyPlaybackService, 'currentTrack');
    const showPlayButtonSpy = spyOn(spotifyPlaybackService, 'showPlayButton');
    await spotifyPlaybackService.handleState(mockSongState);
    expect(sendCurrentStateSpy).toHaveBeenCalledWith(mockSongState);
    expect(currentTrackSpy).toHaveBeenCalledWith({});
    expect(showPlayButtonSpy).toHaveBeenCalledWith(false);
  }));

  it('should check handleState with state returned and paused', (async () => {
    spyOn(spotifyPlaybackService, 'waitForDeviceToBeSelected');
    const clearStatePollingSpy = spyOn(spotifyPlaybackService, 'clearStatePolling');
    const currentTrackSpy = spyOn(spotifyPlaybackService, 'currentTrack');
    const showPlayButtonSpy = spyOn(spotifyPlaybackService, 'showPlayButton');
    await spotifyPlaybackService.handleState(mockSongState);
    expect(clearStatePollingSpy).toHaveBeenCalledWith();
    expect(currentTrackSpy).toHaveBeenCalledWith(mockSortedTrack('', ''));
    expect(showPlayButtonSpy).toHaveBeenCalledWith(true);
  }));

  it('should check handleState with no state returned', (async () => {
    await spotifyPlaybackService.handleState(null);
    expect(spotifyPlaybackService.endOfChain).toBeTruthy();
  }));

  it('should check startStatePolling method', (async () => {
    jasmine.clock().install();
    spotifyPlaybackService.player = mockPlayer();
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
    spotifyPlaybackService.player = mockPlayer();
    const spy = spyOn(spotifyPlaybackService.player, 'pause');

    spotifyPlaybackService.createEventHandlers();
    spotifyPlaybackService.pauseSong$.emit();
    expect(spy).toHaveBeenCalled();
  }));

  it('should check createEventHandlers method playSong', (() => {
    spotifyPlaybackService.player = mockPlayer();
    const spy = spyOn(spotifyPlaybackService.player, 'resume');

    spotifyPlaybackService.createEventHandlers();
    spotifyPlaybackService.playSong$.emit();
    expect(spy).toHaveBeenCalled();
  }));

  it('should check createEventHandlers method nextSong', (() => {
    spotifyPlaybackService.player = mockPlayer();
    const spy = spyOn(spotifyPlaybackService.player, 'nextTrack');

    spotifyPlaybackService.createEventHandlers();
    spotifyPlaybackService.nextSong$.emit();
    expect(spy).toHaveBeenCalled();
  }));

  it('should check createEventHandlers method previousSong', (() => {
    spotifyPlaybackService.player = mockPlayer();
    const spy = spyOn(spotifyPlaybackService.player, 'previousTrack');

    spotifyPlaybackService.createEventHandlers();
    spotifyPlaybackService.previousSong$.emit();
    expect(spy).toHaveBeenCalled();
  }));

  it('should check createEventHandlers method setVolume', (() => {
    spotifyPlaybackService.player = mockPlayer();
    const spy = spyOn(spotifyPlaybackService.player, 'setVolume');

    spotifyPlaybackService.createEventHandlers();
    spotifyPlaybackService.setVolume$.emit();
    expect(spy).toHaveBeenCalled();
  }));

  fit('should check createEventHandlers method player.on initialization_error', (() => {
    spotifyPlaybackService.player = mockPlayer();
    const spy = spyOn(spotifyPlaybackService.player, 'on');

    spotifyPlaybackService.createEventHandlers();
    spotifyPlaybackService.player.on('initialization_error', c => console.log(c));
    expect(spy).toHaveBeenCalled();
  }));

  it('should check waitForDeviceToBeSelected method with player and state', (() => {
    spotifyPlaybackService.player = mockPlayer();
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
    spotifyPlaybackService.player = mockPlayer();
    spotifyPlaybackService.waitForDeviceToBeSelected().catch(err => {
      expect(err).toEqual('No device state');
    });
  }));

  it('should check sendCurrentState method', () => {
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
    const spy = spyOn(spotifyPlaybackService.currentTrack$, 'emit');
    spotifyPlaybackService.currentTrack(mockSortedTrack('', ''));
    expect(spy).toHaveBeenCalledWith(mockSortedTrack('', ''));
  });

  it('should check setVolume method', () => {
    const spy = spyOn(spotifyPlaybackService.setVolume$, 'emit');
    spotifyPlaybackService.setVolume(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
