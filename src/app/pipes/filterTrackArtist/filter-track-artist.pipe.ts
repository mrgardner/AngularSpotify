import { Pipe, PipeTransform } from '@angular/core';

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
  transform(tracks: any, args?: any): any {
    const that = this;
    if (tracks) {
      if (args) {
        return tracks.filter(track => {
          const artist = that.displayArtists(track.track.artists).join('');
          return artist.toLowerCase().includes(args.toLowerCase());
        });
      } else {
        return tracks;
      }
    }
  }
}
