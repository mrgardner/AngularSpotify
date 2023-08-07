import { Injectable } from '@angular/core';
import { SortedTrack, TrackResponse, Trrack, } from '@app/interfaces/track/track.interface';
import { ApolloService } from '@app/services/apollo/apollo.service';
import { UtilService } from '@app/services/util/util.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDataSourceService {
  public tableSubject = new BehaviorSubject<SortedTrack[]>([]);
  public tableSubject$ = this.tableSubject.asObservable();
  public backupSubject = new BehaviorSubject<SortedTrack[]>([]);
  public backupSubject$ = this.backupSubject.asObservable();

  constructor(private apolloService: ApolloService, private utilService: UtilService) { }

  connect(): Observable<SortedTrack[]> {
    return this.tableSubject.asObservable();
  }

  disconnect(): void {
    this.tableSubject.complete();
  }

  loadTracks(playlistId: string, page = 0, size = 100): void {
    this.apolloService.getTracksFromPlaylist(playlistId, page, size).subscribe((tracks: TrackResponse) => {
      const sortedTracks: Array<SortedTrack> = tracks.items.map((t: Trrack) => {
        return {
          title: t.track.name,
          artist: this.utilService.displayArtists(t.track.artists).join(''),
          album_name: t.track.album.name,
          added_at: t.added_at.split('T')[0],
          time: t.track.duration_ms,
          showPlayButton: false,
          showPauseButton: false,
          showTrackNumber: true,
          duration: t.track.duration_ms,
          uri: t.track.uri,
          total: tracks.total,
          size: tracks.limit,
          name: '',
          remove: false,
          is_local: false,
          track: null,
          artists: [],
          filterText: `${t.track.name.toLowerCase()}
            ${this.utilService.displayArtists(t.track.artists).join('').toLowerCase()}
            ${t.track.album.name.toLowerCase()}`.replace(/\s/g, '').trim(),
        }
      });
      this.tableSubject.next(sortedTracks);
      this.backupSubject.next(sortedTracks);
    });
  }

  filter(text: string): void {
    this.tableSubject.next(this.backupSubject.value.filter(track =>
      track.filterText.includes(text.toLowerCase().trim().replace(/\s/g, ''))));
  }
}