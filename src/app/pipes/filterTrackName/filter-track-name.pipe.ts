import { Pipe, PipeTransform } from '@angular/core';
import { Track } from '../../interfaces/track/track.interface';

@Pipe({
  name: 'filterTrackName'
})
export class FilterTrackNamePipe implements PipeTransform {

  transform(tracks: Array<Track>, args?: string): any {
    if (args) {
      return tracks.filter(track => track.name.toLowerCase().includes(args.toLowerCase()));
      // filteredTracks.forEach(track => {
      //   const startIndex = track.track.name.toLowerCase().indexOf(args);
      //   const endIndex = startIndex === 0 ? args.length : args.length + startIndex;
      //   const highlight = track.track.name.toLowerCase().slice(startIndex, endIndex);
      //   track['highlight'] = true;

      //   // track.track.name = track.track.name.replace(track.track.name, '<mark>' + args + '</mark>');
      // });
      // return filteredTracks;
    } else {
      // tracks.forEach(track => track['highlight'] = false);
      return tracks;
    }
  }
}
