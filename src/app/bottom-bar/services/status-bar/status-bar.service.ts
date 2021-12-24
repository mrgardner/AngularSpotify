// Common
import { EventEmitter, Injectable } from '@angular/core';

// Interfaces
import { CurrentTrack } from '@core/interfaces/track/track.interface';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {
  public currentTrack$: EventEmitter<CurrentTrack>;

  constructor() {
    this.currentTrack$ = new EventEmitter();
  }

  setCurrentTrack(track: CurrentTrack) {
    this.currentTrack$.emit(track);
  }
}
