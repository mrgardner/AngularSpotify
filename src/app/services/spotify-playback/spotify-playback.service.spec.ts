import { TestBed, fakeAsync, tick } from '@angular/core/testing';
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
        SpotifyPlaybackService
      ]
    });

    spotifyPlaybackService = TestBed.get(SpotifyPlaybackService);
  });

  afterEach(() => {
    spotifyPlaybackService = null;
  });

  it('should be created', () => {
    expect(spotifyPlaybackService).toBeTruthy();
  });

  xit('should check waitForSpotifyWebPlaybackSDKToLoad method', fakeAsync(() => {
    spyOn(spotifyPlaybackService, 'waitForSpotifyWebPlaybackSDKToLoad').and.returnValue(Promise.resolve(true));
    tick(2000);

    const result = spotifyPlaybackService.waitForSpotifyWebPlaybackSDKToLoad();
    tick(2000);
    console.log(result);
    // const spy = spyOn(spotifyPlaybackService.playSong$, 'emit');
    // spotifyPlaybackService.playSong();
    expect(spotifyPlaybackService).toBeTruthy();
  }));

  xit('should check setupPlayer method', () => {
    spotifyPlaybackService.setupPlayer();
    expect(spotifyPlaybackService).toBeTruthy();
  });

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
