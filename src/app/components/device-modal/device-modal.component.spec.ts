// Amgular Material
import { MatDialogRef } from '@angular/material/dialog';

// Common
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

// Components
import { DeviceModalComponent } from '@components/device-modal/device-modal.component';

// Interfaces
import { SpotifyDeviceResponse, SpotifyDevicesResponse } from '@interfaces/device/device.interface';

// Services
import { DeviceModalService } from '@services/device-modal/device-modal.service';
import { SpotifyService } from '@services/spotify/spotify.service';

// Testing
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('DeviceModalComponent', () => {
  let component: DeviceModalComponent;
  let fixture: ComponentFixture<DeviceModalComponent>;
  let spotifyService: SpotifyService;
  let deviceModalService: DeviceModalService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeviceModalComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {close: (): void => {}}},
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
        title: '',
        artist: '',
        added_at: '',
        album_name: '',
        time: 0,
        showPauseButton: false,
        showPlayButton: false,
        duration: 0,
        uri: '',
        total: 0,
        size: 0,
        filterText: ''
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
    const spy: jasmine.Spy = spyOn(component.dialogRef, 'close');
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
        title: '',
        artist: '',
        added_at: '',
        album_name: '',
        time: 0,
        showPauseButton: false,
        showPlayButton: false,
        duration: 0,
        uri: '',
        total: 0,
        size: 0,
        filterText: ''
      },
      progress_ms: 1,
      repeat_state: 'string',
      shuffle_state: true,
      timestamp: 1
    };
    spyOn(spotifyService, 'makeDeviceActive').and.returnValue(of('test'));
    const spy: jasmine.Spy = spyOn(deviceModalService, 'changeActiveDevice');
    component.makeDeviceActive(device.device);
    expect(component.currentDevice).toEqual(device.device.id);
    expect(spy).toHaveBeenCalled();
  });
});
