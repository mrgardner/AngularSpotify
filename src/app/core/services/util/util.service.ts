// Common
import { Injectable } from '@angular/core';

// Interfaces
import { Artist } from '@core/interfaces/artist/artist.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }

  encodeSpecialSymbols(url: string): string {
    url = url.replace(new RegExp(/[~]/g), '%7E');
    url = url.replace(new RegExp(/[!]/g, 'g'), '%21');
    url = url.replace(new RegExp(/[*]/g, 'g'), '%2A');
    url = url.replace(new RegExp(/[(]/g, 'g'), '%28');
    url = url.replace(new RegExp(/[)]/g, 'g'), '%29');
    return url;
  }

  shortenString(string: string, stringLength: number): string {
    if (string.length > stringLength) {
      return string.substr(0, stringLength) + '...';
    } else {
      return string;
    }
  }

  prettyMs(ms: number): string {
    const roundedSeconds = 1000 * Math.round(ms / 1000);
    const date = new Date(roundedSeconds);
    const seconds = date.getUTCSeconds() < 10 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds();
    return date.getUTCMinutes() + ':' + seconds;
  }

  totalDurationPrettyMs(ms: number): string {
    const roundedSeconds = 1000 * Math.round(ms / 1000);
    const date = new Date(roundedSeconds);
    const minutes = date.getUTCMinutes() ? `${date.getUTCMinutes()} min` : '';
    const hours = date.getUTCHours() ? `${date.getUTCHours()} hr ` : '';
    return hours + minutes;
  }

  displayArtists(artists: Array<Artist>): Array<string> {
    const numberOfArtists = artists.length;
    return artists.map((artist, i) => {
      let artistString = '';
      if (numberOfArtists > 1) {
        if (numberOfArtists - 1 === i) {
          artistString += artist.name;
        } else {
          artistString += `${artist.name}, `;
        }
      } else {
        artistString = artist.name;
      }
      return artistString;
    });
  }

  compare(array1: number | string, array2: number | string, isAsc: boolean) {
    return (array1 < array2 ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
