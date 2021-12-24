// Common
import { EventEmitter, Injectable } from '@angular/core';

// Interfaces
import { Device } from '@app/interfaces/device/device.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceModalService {
  public changeActiveDevice$: EventEmitter<Device>;

  constructor() {
    this.changeActiveDevice$ = new EventEmitter();
  }

  changeActiveDevice(device: Device): void {
    this.changeActiveDevice$.emit(device);
  }
}
