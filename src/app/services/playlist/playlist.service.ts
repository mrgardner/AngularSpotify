import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  public didPlaylistChange$: EventEmitter<any>;
  public deletingPlaylists$: EventEmitter<any>;
  public selectPlaylist$: EventEmitter<any>;
  public test$: EventEmitter<any>;
  public test2$: EventEmitter<any>;

  constructor() {
    this.didPlaylistChange$ = new EventEmitter();
    this.deletingPlaylists$ = new EventEmitter();
    this.selectPlaylist$ = new EventEmitter();
    this.test$ = new EventEmitter();
    this.test2$ = new EventEmitter();
  }

  test(value) {
    this.test$.emit(value);
  }

  test2(value) {
    this.test2$.emit(value);
  }

  selectPlaylist(value) {
    this.selectPlaylist$.emit(value);
  }
}
