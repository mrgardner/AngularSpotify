// Common
import { Pipe, PipeTransform } from '@angular/core';

// Interfaces
import { SortedTrack } from '@interfaces/track/track.interface';

@Pipe({
  name: 'duplicateTrack'
})
export class DuplicateTrackPipe implements PipeTransform {

  transform(tracks: SortedTrack[], args?: boolean): SortedTrack[] {
    const getNotUnique = (array: SortedTrack[]) => {
      const map: Map<string, number> = new Map();
      const map2: Map<string, number> = new Map();
      const map3: Map<string, number> = new Map();
      array.forEach((a: SortedTrack) => map.set(a.title, (map.get(a.title) || 0) + 1));
      const t = array.filter(a => map.get(a.title) > 1);
      t.forEach((a: SortedTrack) => map2.set(a.duration.toString(), (map2.get(a.duration.toString()) || 0) + 1));
      const tt = t.filter((a: SortedTrack) => map2.get(a.duration.toString()) > 1);
      tt.forEach((a: SortedTrack) => map3.set(a.title, (map3.get(a.title) || 0) + 1));
      const ttt = tt.filter(a => map3.get(a.title) > 1);
      ttt.forEach((a: SortedTrack) => a.remove = false);
      return ttt.sort((a: SortedTrack, b: SortedTrack) => {
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
