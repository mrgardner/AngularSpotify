import { EventEmitter, Injectable } from '@angular/core';
import { CurrentTrack } from '../../interfaces/track/current-track.interface';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {
  public currentTrack$: EventEmitter<any>;
  public enlargePicture$: EventEmitter<any>;

  constructor() {
    this.currentTrack$ = new EventEmitter();
    this.enlargePicture$ = new EventEmitter();
  }

  setCurrentTrack(track: CurrentTrack) {
    this.currentTrack$.emit(track);
  }

  enlargePicture(value: boolean, url: string) {
    this.enlargePicture$.emit({value, url});
  }
}
