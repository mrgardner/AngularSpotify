import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {
  public currenttrack$: EventEmitter<any>;
  public enlargePicture$: EventEmitter<any>;

  constructor() {
    this.currenttrack$ = new EventEmitter();
    this.enlargePicture$ = new EventEmitter();
  }

  setCurrentTrack(track) {
    this.currenttrack$.emit(track);
  }

  enlargePicture(value) {
    this.enlargePicture$.emit(value);
  }
}
