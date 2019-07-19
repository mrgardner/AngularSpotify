import { Pipe, PipeTransform } from '@angular/core';
import { Track } from '../../interfaces/track/track.interface';

@Pipe({
  name: 'filterAlbumName'
})
export class FilterAlbumNamePipe implements PipeTransform {

  transform(tracks: Array<Track>, args?: string): any {
    if (args) {
      return tracks.filter((track: Track) => {
        return track.album.name.toLowerCase().includes(args.toLowerCase());
      });
    } else {
      return tracks;
    }
  }
}
