import { EventEmitter, Injectable } from '@angular/core';
import { CurrentTrack } from '../../interfaces/track/current-track.interface';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {
  // TODO: Fix types
  public currentTrack$: EventEmitter<any>;

  constructor() {
    this.currentTrack$ = new EventEmitter();
  }

  setCurrentTrack(track: CurrentTrack) {
    this.currentTrack$.emit(track);
  }
}
