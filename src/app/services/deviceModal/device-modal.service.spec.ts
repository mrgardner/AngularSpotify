import { TestBed } from '@angular/core/testing';
import { DeviceModalService } from './device-modal.service';
import { Device } from '../../interfaces/device/device.interface';

describe('DeviceModalService', () => {
  let deviceModalService: DeviceModalService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeviceModalService
      ]
    });

    deviceModalService = TestBed.get(DeviceModalService);
  });

  afterEach(() => {
    deviceModalService = null;
  });

  it('should be created', () => {
    expect(deviceModalService).toBeTruthy();
  });

  it('should check changeActiveDevice method', () => {
    const mockDevice: Device = {
      id: '',
      is_active: true,
      is_private_sesssion: true,
      is_restricted: true,
      name: '',
      type: '',
      volume_percent: 1
    };
    const spy = spyOn(deviceModalService.changeActiveDevice$, 'emit');
    deviceModalService.changeActiveDevice(mockDevice);
    expect(spy).toHaveBeenCalled();
  });
});
