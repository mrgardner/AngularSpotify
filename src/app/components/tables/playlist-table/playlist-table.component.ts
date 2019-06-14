import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../../../services/spotify/spotify.service';
import { Router, NavigationEnd } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { Track } from '../../../interfaces/track/track.interface';
import { Song } from '../../../interfaces/song/song.interface';
import { SpotifyPlaybackService } from '../../../services/spotify-playback/spotify-playback.service';
import { MatSort, MatPaginator, Sort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PlaylistTableService } from '../../../services/playlist-table/playlist-table.service';
import { Playlist } from '../../../interfaces/playlist/playlist.interface';
import { PlaylistDataSourceService } from '../../../services/playlist-data-source/playlist-data-source.service';
import { UtilService } from '../../../services/util/util.service';
import { TrackService } from '../../../services/track/track.service';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss']
})
export class PlaylistTableComponent implements OnInit, AfterContentInit {
  public tracks: Array<Track> = [];
  public loading: boolean;
  public tracksLoaded: boolean;
  public checkDuplicate: boolean;
  public playlist: Playlist;
  public currentTrack: Track;
  public displayedColumns: string[] = ['dupTrack', 'trackPlaying', 'title', 'artist', 'album', 'addedAt', 'time'];
  public dataSource: PlaylistDataSourceService;
  public selection = new SelectionModel<Object>(true, []);
  public itemCount: number;
  public pageSize: number;
  public state: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private spotifyPlaybackService: SpotifyPlaybackService,
    private playlistTableService: PlaylistTableService,
    public utilService: UtilService,
    private trackService: TrackService) {}

  ngAfterContentInit() {
    if (this.dataSource) {
      this.dataSource.tableSubject$.subscribe((v: Array<any>) => {
        this.tracks = v;
        if (v.length > 0) {
          this.pageSize = v[0].size;
          this.itemCount = v[0].total;
        } else {
          this.itemCount = 0;
        }
      });
    }
  }

  ngOnInit() {
    this.dataSource = new PlaylistDataSourceService(this.spotifyService, this.utilService);

    this.trackService.checkDuplicate$.subscribe((isDuplicate: boolean) => {
      this.checkDuplicate = isDuplicate;
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => {
        const tt = this.router.url.split('/');
        if (tt.length === 4) {
          this.dataSource.loadTracks(tt[3]);
          return this.spotifyService.getPlaylist(tt[3]);
        } else {
          return of();
        }
      })
    ).subscribe((playlistInfo: Playlist) => this.playlist = playlistInfo);

    const breadcrumbs = this.router.url.split('/');
    if (breadcrumbs.length === 4) {
      this.dataSource.loadTracks(breadcrumbs[3]);
      this.spotifyService.getPlaylist(breadcrumbs[3]).subscribe((playlistInfo: Playlist) => {
        this.playlist = playlistInfo;
      });
    }

    this.spotifyPlaybackService.currentSongState$.subscribe(state => this.state = state);
    this.spotifyPlaybackService.currentTrack$.subscribe((track: Track) => this.currentTrack = track);
  }

  loadTracks() {
    const breadcrumbs = this.router.url.split('/');
    this.dataSource.loadTracks(breadcrumbs[3], this.paginator.pageIndex, this.paginator.pageSize);
  }

  getDisplayedColumns() {
    let columns = this.displayedColumns;

    if (!this.checkDuplicate) {
      columns = columns.filter(col => {
        return col !== 'dupTrack';
      });
    }

    return columns;
  }

  sortData(sort: Sort) {
    const data = this.tracks.slice();
    if (!sort.active || sort.direction === '') {
      this.tracks = data;
      return;
    }

    this.tracks = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return this.utilService.compare(a.title, b.title, isAsc);
        case 'artist': return this.utilService.compare(a.artist, b.artist, isAsc);
        case 'album': return this.utilService.compare(a.album_name, b.album_name, isAsc);
        case 'addedAt': return this.utilService.compare(a.addedAt, b.addedAt, isAsc);
        case 'time': return this.utilService.compare(a.time, b.time, isAsc);
        default: return 0;
      }
    });
    this.dataSource.tableSubject.next(this.tracks);
  }

  playSong(track: Song): void {
    this.playlistTableService.setCurrentTrack(track['track']);
    this.playlistTableService.setTrack(track['track']);
    if (this.state.position > 0 && track['track']['name'] === this.state.track_window.current_track.name) {
      this.spotifyPlaybackService.playSong();
    } else {
      this.spotifyService.playSpotifyTrack(this.tracks, track).subscribe(() => {});
    }
  }

  pauseSong(): void {
    this.spotifyPlaybackService.pauseSong();
  }

  toBeRemoved(track: Track): void {
    track.remove = !track.remove;
  }

  goToTrack(track): void {
    this.router.navigate(['/track', track.track.id]);
  }

  getPlaylistDuration(): (number | string) {
    let totalDuration = 0;
    this.tracks.forEach(track => totalDuration += track['track']['track']['duration_ms']);

    if (totalDuration === 0) {
      return '0 sec';
    } else {
      return this.utilService.totalDurationPrettyMs(totalDuration);
    }
  }

  showPlayButton(track: Track): void {
    this.tracks.forEach(t => {
      if (t === track) {
        t.isPlayButtonShowing = true;
      }
    });
  }

  hidePlayButton(track: Track): void {
    this.tracks.forEach(t => {
      if (t === track) {
        t.isPlayButtonShowing = false;
      }
    });
  }

  showPauseButton(track: Track): void {
    track.isPauseButtonShowing = true;
  }

  hidePauseButton(track: Track): void {
    track.isPauseButtonShowing = false;
  }
}
