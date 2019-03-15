import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../services/spotify/spotify.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { TrackService } from '../../../services/track/track.service';
import PrettyMS from 'pretty-ms';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { switchMap, filter } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { CurrentTrack } from 'src/app/interfaces/track/current-track.interface';
import { SpotifySongResponse } from 'src/app/interfaces/song/spotify-song-response.interface';
import { SpotifyToken } from 'src/app/interfaces/spotify-token/spotify-token.interface';
import { Track } from 'src/app/interfaces/track/track.interface';
import { Artist } from 'src/app/interfaces/artist/artist.interface';
import { Song } from 'src/app/interfaces/song/song.interface';
import { SpotifyPlaybackService } from 'src/app/services/spotify-playback/spotify-playback.service';
import { Sort } from '@angular/material';
import { PlaylistTableData } from 'src/app/interfaces/table/playlist-table-data.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { PlaylistTableService } from 'src/app/services/playlist-table/playlist-table.service';
import { Playlist } from 'src/app/interfaces/playlist/playlist.interface';
import { PlaylistDataSourceService } from 'src/app/services/playlist-data-source/playlist-data-source.service';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss']
})
export class PlaylistTableComponent implements OnInit {
  public tracks: Array<Track> = [];
  public loading: boolean;
  public tracksLoaded: boolean;
  public checkDuplicate: boolean;
  public playlist: Playlist;
  private token: string;
  private deviceID: string;
  currentTrack: Object;
  track: Object;
  private currentTrackPosition: number;
  displayedColumns: string[] = ['dupTrack', 'title', 'artist', 'album', 'addedAt', 'time'];
  dataSource: PlaylistDataSourceService;
  selection = new SelectionModel<Object>(true, []);
  source: Array<PlaylistTableData>;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private trackService: TrackService,
    private router: Router,
    private playlistService: PlaylistService,
    private spotifyPlaybackService: SpotifyPlaybackService,
    private playlistTableService: PlaylistTableService) {}

  ngOnInit() {
    console.log('sdfs');
    this.dataSource = new PlaylistDataSourceService(this.spotifyService);
    // this.trackService.checkDuplicate$.subscribe((isDuplicate: boolean) => {
    //   this.checkDuplicate = isDuplicate;
    //   const tt = this.source;
    //   const t = this.trackService.filterDuplicateTracks(tt, isDuplicate);
    //   this.dataSource.data = t;
    // });
    this.playlistTableService.tracks$.subscribe(tracks => this.tracks = tracks);
    this.playlistTableService.track$.subscribe(track => this.track = track);
    this.playlistTableService.playlistInfo$.subscribe(playlistInfo => this.playlist = playlistInfo);
    this.playlistTableService.tracksLoaded$.subscribe(tracksLoaded => this.tracksLoaded = tracksLoaded);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const tt = this.router.url.split('/');
    if (tt.length === 4) {
      console.log(tt);
      this.dataSource.loadTracks(tt[3]);
      console.log(this.dataSource);
      console.log(this.loading);
    }
    });

    // this.dataSource.loading$.subscribe(loading => this.loading = loading);

    const breadcrumbs = this.router.url.split('/');
    if (breadcrumbs.length === 4) {
      console.log(breadcrumbs);
      this.dataSource.loadTracks(breadcrumbs[3]);
      console.log(this.dataSource);
    }
  }

  loadSearchReults() {
    // const breadcrumbs = this.breadcrumbService.getBreadcrumbs();
    // this.dataSource.(breadcrumbs[1].id, '', '', this.paginator.pageIndex, this.paginator.pageSize);
  }

  getDisplayedColumns() {
    let tt = this.displayedColumns;

    if (!this.checkDuplicate) {
      tt = tt.filter(cd => {
        return cd !== 'dupTrack';
      });
    }

    return tt;
  }

  // sortData(sort: Sort) {
  //   const data = this.dataSource.data.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.dataSource.data = data;
  //     return;
  //   }

  //   this.dataSource.data = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'title': return compare(a.title, b.title, isAsc);
  //       case 'artist': return compare(a.artist, b.artist, isAsc);
  //       case 'album': return compare(a.album, b.album, isAsc);
  //       case 'addedAt': return compare(a.addedAt, b.addedAt, isAsc);
  //       case 'time': return compare(a.duration, b.duration, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

  testing(track: Song): void {
    this.playlistTableService.playSpotifyTrack(this.currentTrackPosition, this.tracks, this.track, track).subscribe(() => {});
  }

  pauseSong(track: Song): void {
    this.playlistTableService.pauseSpotifyTrack(track).subscribe(() => {});
  }

  convertMS(ms: number): number {
    return PrettyMS(ms, { secDecimalDigits: 0 });
  }

  shortenString(string: string, stringLength: number): string {
    if (string.length > stringLength) {
      return string.substr(0, stringLength) + '...';
    } else {
      return string;
    }
  }

  toBeRemoved(track: Track): void {
    track.remove = !track.remove;
  }

  goToTrack(track): void {
    this.router.navigate(['/track', track.track.id]);
  }

  getPlaylistDuration(): (number | string) {
    let totalDuration = 0;
    this.tracks.forEach(track => totalDuration += track['track']['duration_ms']);

    if (totalDuration === 0) {
      return '0 sec';
    } else {
      return this.convertMS(totalDuration);
    }
  }

  // showPlayButton(track: Track): void {
  //   this.dataSource.data.forEach(t => {
  //     if (t === track) {
  //       t.isPlayButtonShowing = true;
  //     }
  //   });
  // }

  // hidePlayButton(track: Track): void {
  //   this.dataSource.data.forEach(t => {
  //     if (t === track) {
  //       t.isPlayButtonShowing = false;
  //     }
  //   });
  // }

  // showPauseButton(track: Track): void {
  //   track.isPauseButtonShowing = true;
  // }

  // hidePauseButton(track: Track): void {
  //   track.isPauseButtonShowing = false;
  // }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
