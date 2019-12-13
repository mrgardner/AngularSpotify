import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilService } from '../util/util.service';
import { TrackSpotifyReponse } from '../../interfaces/track/track-spotify-reponse.interface';
import { SortedTracks } from '../../interfaces/track/sorted-tracks.interface';
import { SortedTrack } from '../../interfaces/track/sorted-track.interface';
import { ApolloService } from '../apollo/apollo.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDataSourceService {
  public tableSubject = new BehaviorSubject<any[]>([]);
  public tableSubject$ = this.tableSubject.asObservable();
  public backupSubject = new BehaviorSubject<any[]>([]);
  public backupSubject$ = this.backupSubject.asObservable();

  constructor(private apolloService: ApolloService, private utilService: UtilService) {}

  connect(): Observable<any[]> {
    return this.tableSubject.asObservable();
  }

  disconnect(): void {
    this.tableSubject.complete();
  }

  loadTracks(playlistId: string, page = 0, size = 100): void {
    this.apolloService.getTracksFromPlaylist(playlistId, page, size).subscribe((tracks: TrackSpotifyReponse) => {
      const sortedTracks: Array<SortedTracks> = tracks.items.map((t: SortedTrack) => {
        return {
          title: t.track.name,
          artist: this.utilService.displayArtists(t.track.artists).join(''),
          album_name: t.track.album.name,
          addedAt: t.added_at.split('T')[0],
          time: t.track.duration_ms,
          isPlayButtonShowing: false,
          isPauseButtonShowing: false,
          duration: t.track.duration_ms,
          uri: t.track.uri,
          track: t,
          total: tracks.total,
          size: tracks.limit,
          filterText: `${t.track.name.toLowerCase()}
            ${this.utilService.displayArtists(t.track.artists).join('').toLowerCase()}
            ${t.track.album.name.toLowerCase()}`.replace(/\s/g, '').trim()
        };
      });
      this.tableSubject.next(sortedTracks);
      this.backupSubject.next(sortedTracks);
    });
  }

  filter(text: string) {
    this.tableSubject.next(this.backupSubject.value.filter(track =>
      track.filterText.includes(text.toLowerCase().trim().replace(/\s/g, ''))));
  }
}
