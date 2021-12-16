// Angular Material
import { MatDialogModule } from '@angular/material/dialog';

// Common
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

// Components
import { SpotifyStatusBarComponent } from '@components/spotify-status-bar/spotify-status-bar.component';

// Services
import { DeviceModalService } from '@services/device-modal/device-modal.service';
import { SpotifyService } from '@services/spotify/spotify.service';
import { SpotifyPlaybackService } from '@services/spotify-playback/spotify-playback.service';
import { StatusBarService } from '@services/status-bar/status-bar.service';

// Testing
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('SpotifyStatusBarComponent', () => {
  let component: SpotifyStatusBarComponent;
  let fixture: ComponentFixture<SpotifyStatusBarComponent>;
  let statusBarService: StatusBarService;
  let deviceModalService: DeviceModalService;
  let spotifyService: SpotifyService;
  let spotifyPlaybackService: SpotifyPlaybackService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpotifyStatusBarComponent
      ],
      imports: [
        HttpClientModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyStatusBarComponent);
    component = fixture.componentInstance;
    statusBarService = TestBed.inject(StatusBarService);
    deviceModalService = TestBed.inject(DeviceModalService);
    spotifyService = TestBed.inject(SpotifyService);
    spotifyPlaybackService = TestBed.inject(SpotifyPlaybackService);
  });

  afterEach(() => {
    statusBarService = null;
    deviceModalService = null;
    spotifyService = null;
    spotifyPlaybackService = null;
  });

  it('should create spotify status bar component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit method', () => {
    spyOn(spotifyService, 'getCurrentPlayer').and.returnValue(of(null));
    component.ngOnInit();
    expect(component.isRepeatPlaylistShowing).toBeFalsy();
    expect(component.isRepeatTrackShowing).toBeFalsy();
    expect(component.isRepeatOffShowing).toBeTruthy();
    expect(component.volume).toEqual(100);
  });

  it('should check ngOnInit method changeActiveDevices', () => {
    const mockDevice = {
      id: '123',
      is_active: true,
      is_private_sesssion: true,
      is_restricted: true,
      name: 'test',
      type: '',
      volume_percent: 0
    };
    spyOn(spotifyService, 'getCurrentPlayer').and.returnValue(of(null));
    component.ngOnInit();
    deviceModalService.changeActiveDevice(mockDevice);
    expect(component.currentDeviceId).toEqual(mockDevice.id);
    expect(component.currentDeviceName).toEqual(mockDevice.name);
    expect(component.currentDevice).toEqual(mockDevice);
  });

  it('should check ngOnInit method getCurrentPlayer', () => {
    const mockDevice = {
      context: '',
      currently_playing_type: '',
      device: {
        id: '123',
        is_active: true,
        is_private_sesssion: true,
        is_restricted: true,
        name: 'test',
        type: '',
        volume_percent: 0
      },
      is_playing: true,
      item: {
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
        addedAt: ''
      },
      progress_ms: 0,
      repeat_state: '',
      shuffle_state: true,
      timestamp: 0
    };
    spyOn(spotifyService, 'getCurrentPlayer').and.returnValue(of(mockDevice));
    component.ngOnInit();
    expect(component.currentDeviceId).toEqual(mockDevice.device.id);
    expect(component.currentDeviceName).toEqual(mockDevice.device.name);
    expect(component.currentDevice).toEqual(mockDevice.device);
  });

  it('should check ngOnInit method currentSongState', () => {
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
    spyOn(spotifyService, 'getCurrentPlayer').and.returnValue(of(null));
    component.ngOnInit();
    spotifyPlaybackService.sendCurrentState(mockSongState);
    expect(component.state).toEqual(mockSongState);
    expect(component.songCurrentProgress).toEqual(mockSongState.duration);
    expect(component.currentTrack).toEqual(mockSongState.track_window.current_track);
  });

  it('should check ngOnInit method showPlayButton', () => {
    spyOn(spotifyService, 'getCurrentPlayer').and.returnValue(of(null));
    component.ngOnInit();
    spotifyPlaybackService.showPlayButton(true);
    expect(component.showPlayButton).toBeTruthy();
  })

  it('should check openDeviceModal method', () => {
    const spy = spyOn(component.dialog, 'open');
    component.openDeviceModal();
    expect(spy).toHaveBeenCalled();
  });

  // TODO: Fix test
  it('should check onVolumeChange method', () => {
    const spy = spyOn(spotifyPlaybackService, 'setVolume');
    component.onVolumeChange(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should check playSong method', () => {
    const spy = spyOn(spotifyPlaybackService, 'playSong');
    component.playSong();
    expect(spy).toHaveBeenCalled();
  });

  it('should check pauseSong method', () => {
    const spy = spyOn(spotifyPlaybackService, 'pauseSong');
    component.pauseSong();
    expect(spy).toHaveBeenCalled();
  });

  it('should check nextSong method', () => {
    const spy = spyOn(spotifyPlaybackService, 'nextSong');
    component.nextSong();
    expect(spy).toHaveBeenCalled();
  });

  it('should check previousSong method', () => {
    const spy = spyOn(spotifyPlaybackService, 'previousSong');
    component.previousSong();
    expect(spy).toHaveBeenCalled();
  });

  it('should check repeatPlaylist method', () => {
    const spy = spyOn(spotifyService, 'setRepeatMode').and.returnValue(of(null));
    component.repeatPlaylist();
    expect(component.isRepeatOffShowing).toBeFalsy();
    expect(component.isRepeatPlaylistShowing).toBeTruthy();
    expect(component.isRepeatTrackShowing).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('should check repeatTrack method', () => {
    const spy = spyOn(spotifyService, 'setRepeatMode').and.returnValue(of(null));
    component.repeatTrack();
    expect(component.isRepeatOffShowing).toBeFalsy();
    expect(component.isRepeatPlaylistShowing).toBeFalsy();
    expect(component.isRepeatTrackShowing).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('should check repeatOff method', () => {
    const spy = spyOn(spotifyService, 'setRepeatMode').and.returnValue(of(null));
    component.repeatOff();
    expect(component.isRepeatOffShowing).toBeTruthy();
    expect(component.isRepeatPlaylistShowing).toBeFalsy();
    expect(component.isRepeatTrackShowing).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });
});
