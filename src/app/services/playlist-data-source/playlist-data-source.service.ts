import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpotifyService } from '../spotify/spotify.service';
import { Track } from 'src/app/interfaces/track/track.interface';
import PrettyMS from 'pretty-ms';
import { Artist } from 'src/app/interfaces/artist/artist.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDataSourceService {
  private tableSubject = new BehaviorSubject<any[]>([]);
  public tableSubject$ = this.tableSubject.asObservable();

  constructor(private spotifyService: SpotifyService) {}

  connect(): Observable<any[]> {
    return this.tableSubject.asObservable();
  }

  disconnect(): void {
    this.tableSubject.complete();
  }

  loadTracks(playlistId: string, page = 0, size = 100) {
    this.spotifyService.getTracksFromPlaylist(playlistId, page, size).subscribe((tracks: any) => {
        const sortedTracks = tracks.items.map((t: Track) => {
          return {
            title: t['track'].name,
            artist: this.displayArtists(t['track'].artists).join(''),
            album: t['track'].album.name,
            addedAt: t['added_at'].split('T')[0],
            time: this.convertMS(t['track'].duration_ms),
            isPlayButtonShowing: false,
            isPauseButtonShowing: false,
            duration: t['track'].duration_ms,
            uri: t['track'].uri,
            track: t
          };
        });
        sortedTracks.forEach(element => {
          element.total = tracks.total;
          element.size = tracks.limit;
        });
        this.tableSubject.next(sortedTracks);
    });
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
      }  else {
        artistString = artist.name;
      }
      return artistString;
    });
  }

  // TODO: Remove this function
  convertMS(ms: number): number {
    return PrettyMS(ms, { secDecimalDigits: 0 });
  }
}
