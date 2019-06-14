import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpotifyService } from '../spotify/spotify.service';
import { Track } from '../../interfaces/track/track.interface';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDataSourceService {
  public tableSubject = new BehaviorSubject<any[]>([]);
  public tableSubject$ = this.tableSubject.asObservable();

  constructor(private spotifyService: SpotifyService, private utilService: UtilService) {}

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
          artist: this.utilService.displayArtists(t['track'].artists).join(''),
          album_name: t['track'].album.name,
          addedAt: t['added_at'].split('T')[0],
          time: t['track'].duration_ms,
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
}
