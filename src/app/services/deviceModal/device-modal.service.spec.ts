import { TestBed, inject } from '@angular/core/testing';

import { DeviceModalService } from './device-modal.service';

describe('DeviceModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceModalService]
    });
  });

  it('should be created', inject([DeviceModalService], (service: DeviceModalService) => {
    expect(service).toBeTruthy();
  }));
});
