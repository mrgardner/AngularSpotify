import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceModalService {
  public changeActiveDevice$: EventEmitter<boolean>;

  constructor() {
    this.changeActiveDevice$ = new EventEmitter();
  }

  changeActiveDevice(device) {
    this.changeActiveDevice$.emit(device);
  }
}
