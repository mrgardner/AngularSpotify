import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { finalize, catchError } from 'rxjs/operators';
import { SpotifyService } from '../spotify/spotify.service';
import { Track } from 'src/app/interfaces/track/track.interface';
import PrettyMS from 'pretty-ms';
import { Artist } from 'src/app/interfaces/artist/artist.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDataSourceService {
  private tableSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public tableSubject$ = this.tableSubject.asObservable();

  constructor(private spotifyService: SpotifyService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.tableSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.tableSubject.complete();
    this.loadingSubject.complete();
  }


  loadTracks(playlistId: string, startsWith = '', sort = '', page = 0, size = 100) {
    console.log(playlistId);
    this.loadingSubject.next(true);

    this.spotifyService.getTracksFromPlaylist(playlistId, page, size).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((tracks: any) => {
        console.log(tracks);
        const sortedTracks = tracks.items.map((t: Track) => {
          return {
            title: t['track'].name,
            artist: this.displayArtists(t['track'].artists).join(''),
            album: t['track'].album.name,
            addedAt: t['added_at'].split('T')[0],
            time: this.convertMS(t['track'].duration_ms),
            isPlayButtonShowing: t.isPlayButtonShowing,
            isPauseButtonShowing: t.isPauseButtonShowing,
            duration: t['track'].duration_ms,
            uri: t['track'].uri,
            track: t
          };
        });
        sortedTracks.forEach(element => {
          element.total = tracks.total;
          element.size = tracks.limit;
        });
        this.loadingSubject.next(false);
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

  convertMS(ms: number): number {
    return PrettyMS(ms, { secDecimalDigits: 0 });
  }

  // loadSearchResults(taxonomyId: string, startsWith = '', sort = '', page = 0, size = 20) {
  //   this.loadingSubject.next(true);

  //   // this.playlistTableService.getSearchResultsTableData(taxonomyId, startsWith, sort, page, size).pipe(
  //   //     catchError(() => of([])),
  //   //     finalize(() => this.loadingSubject.next(true))
  //   //   )
  //   //   .subscribe((lessons: any) => {
  //   //     this.tableSubject.next(lessons.content);
  //   // });
  // }
}
