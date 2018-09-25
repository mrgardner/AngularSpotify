import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTrackName'
})
export class FilterTrackNamePipe implements PipeTransform {

  transform(tracks: Array<any>, args?: any): any {
    if (tracks) {
      if (args) {
        const filteredTracks = tracks.filter(track => track.track.name.toLowerCase().includes(args.toLowerCase()));
        console.log(filteredTracks);
        filteredTracks.forEach(track => {
          console.log(args)
          console.log(args.length)
          const startIndex = track.track.name.toLowerCase().indexOf(args);
          const endIndex = startIndex === 0 ? args.length : args.length + startIndex;
          console.log('start', startIndex, 'end', endIndex);
          const highlight = track.track.name.toLowerCase().slice(startIndex, endIndex);
          console.log(highlight);

          track['highlight'] = true;

          // track.track.name = track.track.name.replace(track.track.name, '<mark>' + args + '</mark>');
          console.log(track)
        });
        console.log(filteredTracks);
        return filteredTracks;
      } else {
        tracks.forEach(track => track['highlight'] = false);
        return tracks;
      }
    }
  }
}
