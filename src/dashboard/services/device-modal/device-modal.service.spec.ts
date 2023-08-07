import { TestBed } from '@angular/core/testing';
import { Device } from '@app/interfaces/device/device.interface';
import { DeviceModalService } from '@dashboard/services/device-modal/device-modal.service';

describe('DeviceModalService', () => {
  let deviceModalService: DeviceModalService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeviceModalService
      ]
    });

    deviceModalService = TestBed.inject(DeviceModalService);
  });

  // TODO TESTING: Fix
  // afterEach(() => {
  //   deviceModalService = null;
  // });

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