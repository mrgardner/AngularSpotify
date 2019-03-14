import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTrackName'
})
export class FilterTrackNamePipe implements PipeTransform {

  transform(tracks: Array<any>, args?: any): any {
    if (tracks) {
      if (args) {
        const filteredTracks = tracks.filter(track => track.track.name.toLowerCase().includes(args.toLowerCase()));
        filteredTracks.forEach(track => {
          const startIndex = track.track.name.toLowerCase().indexOf(args);
          const endIndex = startIndex === 0 ? args.length : args.length + startIndex;
          const highlight = track.track.name.toLowerCase().slice(startIndex, endIndex);
          track['highlight'] = true;

          // track.track.name = track.track.name.replace(track.track.name, '<mark>' + args + '</mark>');
        });
        return filteredTracks;
      } else {
        tracks.forEach(track => track['highlight'] = false);
        return tracks;
      }
    }
  }
}
