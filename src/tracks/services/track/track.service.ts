import { EventEmitter, Injectable } from '@angular/core';
import { SortedTrack } from '@app/interfaces/track/track.interface';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  public checkDuplicate$: EventEmitter<any>;
  public currentTrack$: EventEmitter<any>;
  public filterTrack$: EventEmitter<string>;

  constructor() {
    this.checkDuplicate$ = new EventEmitter();
    this.currentTrack$ = new EventEmitter();
    this.filterTrack$ = new EventEmitter();
  }

  checkDuplicate(value: boolean) {
    this.checkDuplicate$.emit(value);
  }

  filterTrack(text: string) {
    this.filterTrack$.emit(text);
  }

  filterDuplicateTracks(tracks: Array<SortedTrack>, args: boolean) {
    const getNotUnique = (array: Array<SortedTrack>) => {
      const map = new Map();
      const map2 = new Map();
      const map3 = new Map();
      array.forEach(a => map.set(a.title, (map.get(a.title) || 0) + 1));
      const t = array.filter(a => map.get(a.title) > 1);
      t.forEach(a => map2.set(a.duration, (map2.get(a.duration) || 0) + 1));
      const tt = t.filter(a => map2.get(a.duration) > 1);
      tt.forEach(a => map3.set(a.title, (map3.get(a.title) || 0) + 1));
      const ttt = tt.filter(a => map3.get(a.title) > 1);
      ttt.forEach(a => a.remove = false);
      return ttt.sort(function (a, b) {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    };
    if (args) {
      return getNotUnique(tracks);
    }
    return tracks;
  }
}