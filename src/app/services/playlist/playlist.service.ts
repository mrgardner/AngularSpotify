// Common
import { EventEmitter, Injectable } from '@angular/core';

// Interfaces
import { Playlist } from '@interfaces/playlist/playlist.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  public selectPlaylist$: EventEmitter<Playlist>;

  constructor() {
    this.selectPlaylist$ = new EventEmitter();
  }

  selectPlaylist(value: Playlist) {
    this.selectPlaylist$.emit(value);
  }
}
