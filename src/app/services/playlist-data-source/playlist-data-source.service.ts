import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpotifyService } from '../spotify/spotify.service';
import { Track } from '../../interfaces/track/track.interface';
import { UtilService } from '../util/util.service';
import { TrackSpotifyReponse } from '../../interfaces/track/track-spotify-reponse.interface';
import { SortedTracks } from '../../interfaces/track/sorted-tracks.interface';
import { CurrentTrack } from '../../interfaces/track/current-track.interface';
import { SortedTrack } from '../../interfaces/track/sorted-track.interface';

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

  loadTracks(playlistId: string, page = 0, size = 100): void {
    this.spotifyService.getTracksFromPlaylist(playlistId, page, size).subscribe((tracks: TrackSpotifyReponse) => {
      console.log(tracks);
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
          size: tracks.limit
        };
      });
      this.tableSubject.next(sortedTracks);
    });
  }
}
