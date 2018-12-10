import { Injectable, EventEmitter } from '@angular/core';
import { Device } from 'src/app/interfaces/device/device.interface';

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
