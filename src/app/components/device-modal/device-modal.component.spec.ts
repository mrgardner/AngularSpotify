import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceModalComponent } from './device-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { of } from 'rxjs';
import { SpotifyDevicesResponse } from '../../interfaces/device/spotify-devices-response.interface';
import { SpotifyDeviceResponse } from '../../interfaces/device/spotify-device-response.interface';
import { DeviceModalService } from '../../services/deviceModal/device-modal.service';

describe('DeviceModalComponent', () => {
  let component: DeviceModalComponent;
  let fixture: ComponentFixture<DeviceModalComponent>;
  let spotifyService: SpotifyService;
  let deviceModalService: DeviceModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeviceModalComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {close: () => {}}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceModalComponent);
    component = fixture.componentInstance;
    spotifyService = TestBed.inject(SpotifyService);
    deviceModalService = TestBed.inject(DeviceModalService);
  });

  afterEach(() => {
    spotifyService = null;
    deviceModalService = null;
  });

  it('should create device modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit for update with getAvailableDevices spotifySevice method', () => {
    const devices: SpotifyDevicesResponse = {
      devices: [
        {
          id: 'string',
          is_active: true,
          is_private_sesssion: true,
          is_restricted: true,
          name: 'string',
          type: 'string',
          volume_percent: 1,
        }
      ]
    };
    spyOn(spotifyService, 'getAvailableDevices').and.returnValue(of(devices));
    spyOn(spotifyService, 'getCurrentPlayer').and.returnValue(of());
    component.ngOnInit();
    expect(component.devices).toEqual(devices.devices);
  });

  it('should check ngOnInit for update with getCurrentPlayer spotifySevice method', () => {
    const device: SpotifyDeviceResponse = {
      context: 'string',
      currently_playing_type: 'string',
      device: {
        id: 'string',
        is_active: true,
        is_private_sesssion: true,
        is_restricted: true,
        name: 'string',
        type: 'string',
        volume_percent: 1,
      },
      is_playing: true,
      item: {
        album: {
          album_type: 'string',
          artists: [
            {
              external_urls: 'string',
              id: 'string',
              name: 'string',
              type: 'string',
              uri: 'string'
            }
          ],
          available_markets: [
            ''
          ],
          external_urls: {
            spotify: ''
          },
          href: 'string',
          id: 'string',
          images: [
            {
              height: 1,
              url: 'string',
              width: 1
            }
          ],
          name: 'string',
          release_date: 'string',
          release_date_precision: 'string',
          total_track: 1,
          type: 'string',
          uri: 'string'
        },
        artists: [
          {
            external_urls: 'string',
            id: 'string',
            name: 'string',
            type: 'string',
            uri: 'string'
          }
        ],
        available_markets: ['Array<string>'],
        disc_number: 1,
        duration_ms: 1,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: 'string',
        id: 'string',
        name: 'string',
        popularity: 1,
        preview_url: 'string',
        track_number: 1,
        type: 'string',
        uri: 'string',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: 'string',
        title: 'string',
        artist: 'string',
        time: 'string',
        addedAt: 'string',
        duration: 0
      },
      progress_ms: 1,
      repeat_state: 'string',
      shuffle_state: true,
      timestamp: 1
    };
    spyOn(spotifyService, 'getAvailableDevices').and.returnValue(of());
    spyOn(spotifyService, 'getCurrentPlayer').and.returnValue(of(device));
    component.ngOnInit();
    expect(component.currentDevice).toEqual(device.device.id);
  });

  it('should check the hideModal method', () => {
    const spy = spyOn(component.dialogRef, 'close');
    component.hideModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should check the makeDeviceActive method', () => {
    const device: SpotifyDeviceResponse = {
      context: 'string',
      currently_playing_type: 'string',
      device: {
        id: 'string',
        is_active: true,
        is_private_sesssion: true,
        is_restricted: true,
        name: 'string',
        type: 'string',
        volume_percent: 1,
      },
      is_playing: true,
      item: {
        album: {
          album_type: 'string',
          artists: [
            {
              external_urls: 'string',
              id: 'string',
              name: 'string',
              type: 'string',
              uri: 'string'
            }
          ],
          available_markets: [
            ''
          ],
          external_urls: {
            spotify: ''
          },
          href: 'string',
          id: 'string',
          images: [
            {
              height: 1,
              url: 'string',
              width: 1
            }
          ],
          name: 'string',
          release_date: 'string',
          release_date_precision: 'string',
          total_track: 1,
          type: 'string',
          uri: 'string'
        },
        artists: [
          {
            external_urls: 'string',
            id: 'string',
            name: 'string',
            type: 'string',
            uri: 'string'
          }
        ],
        available_markets: ['Array<string>'],
        disc_number: 1,
        duration_ms: 1,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: 'string',
        id: 'string',
        name: 'string',
        popularity: 1,
        preview_url: 'string',
        track_number: 1,
        type: 'string',
        uri: 'string',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: 'string',
        title: 'string',
        artist: 'string',
        time: 'string',
        addedAt: 'string',
        duration: 0
      },
      progress_ms: 1,
      repeat_state: 'string',
      shuffle_state: true,
      timestamp: 1
    };
    spyOn(spotifyService, 'makeDeviceActive').and.returnValue(of('test'));
    const spy = spyOn(deviceModalService, 'changeActiveDevice');
    component.makeDeviceActive(device.device);
    expect(component.currentDevice).toEqual(device.device.id);
    expect(spy).toHaveBeenCalled();
  });
});
