// Common
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  public selectPlaylist$: EventEmitter<any>;

  constructor() {
    this.selectPlaylist$ = new EventEmitter();
  }

  selectPlaylist(value: any) {
    this.selectPlaylist$.emit(value);
  }
}
