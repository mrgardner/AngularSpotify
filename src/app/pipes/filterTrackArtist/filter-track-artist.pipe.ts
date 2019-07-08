import { Pipe, PipeTransform } from '@angular/core';
import { Track } from '../../interfaces/track/track.interface';

@Pipe({
  name: 'filterTrackArtist'
})
export class FilterTrackArtistPipe implements PipeTransform {
  displayArtists(artists) {
    const numberOfArtists = artists.length;
    return artists.map((artist, i) => {
      let artistString = '';
      if (numberOfArtists > 1) {
        if (numberOfArtists - 1 === i) {
          artistString += artist.name;
        } else {
          artistString += `${artist.name}, `;
        }
      }  else {
        artistString = artist.name;
      }
      return artistString;
    });
  }
  transform(tracks: Array<Track>, args?: string): any {
    const that = this;
    if (args) {
      return tracks.filter((track: Track) => {
        const artist = that.displayArtists(track.artists).join('');
        return artist.toLowerCase().includes(args.toLowerCase());
      });
    } else {
      return tracks;
    }
  }
}
