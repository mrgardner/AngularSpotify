// Common
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duplicateTrack'
})
export class DuplicateTrackPipe implements PipeTransform {

  transform(tracks: any, args?: boolean): any {
    const getNotUnique = (array) => {
      const map = new Map();
      const map2 = new Map();
      const map3 = new Map();
      array.forEach(a => map.set(a['track']['name'], (map.get(a['track']['name']) || 0) + 1));
      const t = array.filter(a => map.get(a['track']['name']) > 1);
      t.forEach(a => map2.set(a['track']['duration_ms'], (map2.get(a['track']['duration_ms']) || 0) + 1));
      const tt = t.filter(a => map2.get(a['track']['duration_ms']) > 1);
      tt.forEach(a => map3.set(a['track']['name'], (map3.get(a['track']['name']) || 0) + 1));
      const ttt = tt.filter(a => map3.get(a['track']['name']) > 1);
      ttt.forEach(a => a['remove'] = false);
      return ttt.sort(function(a, b) {
        const nameA = a.track.name.toLowerCase();
        const nameB = b.track.name.toLowerCase();
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
