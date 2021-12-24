// Angular Material
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatLegacyTable as MatTable } from '@angular/material/legacy-table';

// Common
import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Interfaces
import { DragSource, DropData } from '@core/interfaces/drag-and-drop/drag-and-drop.interface';
import { Playlist } from '@core/interfaces/playlist/playlist.interface';
import { SortedTrack } from '@core/interfaces/track/track.interface';
import { SpotifySongResponse } from '@core/interfaces/song/song.interface';

// Services
import { ApolloService } from '@core/services/apollo/apollo.service';
import { PlaylistDataSourceService } from '@playlists/services/playlist-data-source/playlist-data-source.service';
import { SpotifyPlaybackService } from '@core/services/spotify-playback/spotify-playback.service';
import { SpotifyService } from '@core/services/spotify/spotify.service';
import { TrackService } from '@tracks/services/track/track.service';
import { UtilService } from '@core/services/util/util.service';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss']
})
export class PlaylistTableComponent implements OnInit, AfterContentInit, OnDestroy {
  public tracks: SortedTrack[] = [];
  public loading: boolean;
  public tracksLoaded: boolean;
  public checkDuplicate: boolean;
  public playlist: Playlist;
  public currentTrack: SortedTrack;
  public displayedColumns: string[] = ['dupTrack', 'trackPlaying', 'title', 'artist', 'album', 'added_at', 'time'];
  public dataSource: PlaylistDataSourceService;
  public selection: SelectionModel<SortedTrack> = new SelectionModel<SortedTrack>(true, []);
  public itemCount: number;
  public pageSize: number;
  public state: SpotifySongResponse;
  public endOfChain: boolean;
  public routerSubscription: Subscription;
  public checkDuplicateSubscription: Subscription;
  public currentSongStateSubscription: Subscription;
  public currentTrackSubscription: Subscription;
  public showPlayButtonSubscription: Subscription;
  public filterSubscription: Subscription;
  public test: string;
  public filterText: string;
  public draggedString: string;
  public showPlayButtonText: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<SortedTrack[]>;
  @ViewChild(CdkDropList) _dropList: CdkDropList;

  constructor(
    private apolloService: ApolloService,
    private spotifyService: SpotifyService,
    private router: Router,
    private spotifyPlaybackService: SpotifyPlaybackService,
    public utilService: UtilService,
    private trackService: TrackService,
    private route: ActivatedRoute) { }

  // TODO: Add functionality to save drag and drop to spotify endpoint
  dropTable(event: DropData): void {
    if (this.dataSource) {
      this.dataSource.tableSubject$.subscribe((v: SortedTrack[]) => {
        const prevIndex: number = v.findIndex((d) => d === event.item.data);
        moveItemInArray(v, prevIndex, event.currentIndex);
        this.tracks = v;
        if (v.length > 0) {
          this.pageSize = v[0].size;
          this.itemCount = v[0].total;
        } else {
          this.itemCount = 0;
        }
        this.table.renderRows();
      });
    } else {
      this.endOfChain = true;
    }
  }

  dragStart(e: DragSource): void {
    this.draggedString = `${e.source.data.title} - ${e.source.data.artist}`;
  }

  ngAfterContentInit(): void {
    if (this.dataSource) {
      this.dataSource.tableSubject$.subscribe((v: SortedTrack[]) => {
        this.tracks = v;
        if (v.length > 0) {
          this.pageSize = v[0].size;
          this.itemCount = v[0].total;
        } else {
          this.itemCount = 0;
        }
      });
    } else {
      this.endOfChain = true;
    }
  }

  ngOnInit(): void {
    this.filterText = '';
    this.dataSource = new PlaylistDataSourceService(this.apolloService, this.utilService);
    this.test = '';

    this.routerSubscription = this.route.url.pipe(switchMap((urlSegment: UrlSegment[]) => {
      if (urlSegment.length === 2) {
        this.dataSource.loadTracks(urlSegment[1].path);
        this.endOfChain = false;
        return this.apolloService.getPlaylist(urlSegment[1].path);
      } else {
        this.endOfChain = true;
        return of();
      }
    })).subscribe((playlistInfo: Playlist) => this.playlist = playlistInfo);
    this.checkDuplicateSubscription = this.trackService.checkDuplicate$
      .subscribe((isDuplicate: boolean) => this.checkDuplicate = isDuplicate);
    this.currentSongStateSubscription = this.spotifyPlaybackService.currentSongState$
      .subscribe(state => this.state = state);
    this.currentTrackSubscription = this.spotifyPlaybackService.currentTrack$
      .subscribe((track: SortedTrack) => this.currentTrack = track);

    this.filterSubscription = this.trackService.filterTrack$.subscribe((filterText: string) => {
      this.filterText = filterText;
      this.dataSource.filter(filterText);
    });

    this.showPlayButtonSubscription = this.spotifyPlaybackService.showPlayButton$
      .subscribe((value: boolean) => this.showPlayButtonText = value);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.checkDuplicateSubscription.unsubscribe();
    this.currentSongStateSubscription.unsubscribe();
    this.currentTrackSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
    this.showPlayButtonSubscription.unsubscribe();
  }

  loadTracks(): void {
    const breadcrumbs: string[] = this.router.url.split('/');
    this.dataSource.loadTracks(breadcrumbs[3], this.paginator.pageIndex, this.paginator.pageSize);
  }

  getDisplayedColumns(): string[] {
    let columns: string[] = this.displayedColumns;

    if (!this.checkDuplicate) {
      columns = columns.filter((column: string) => {
        return column !== 'dupTrack';
      });
    }

    return columns;
  }

  sortData(sort: Sort): void {
    const data: SortedTrack[] = this.tracks.slice();
    if (!sort.active || sort.direction === '') {
      this.tracks = data;
      return;
    }

    this.tracks = data.sort((a, b) => {
      const isAsc: boolean = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return this.utilService.compare(a.title, b.title, isAsc);
        case 'artist': return this.utilService.compare(a.artist, b.artist, isAsc);
        case 'album': return this.utilService.compare(a.album_name, b.album_name, isAsc);
        case 'added_at': return this.utilService.compare(a.added_at, b.added_at, isAsc);
        case 'time': return this.utilService.compare(a.time, b.time, isAsc);
        default: return 0;
      }
    });
    this.dataSource.tableSubject.next(this.tracks);
  }

  startListeningText(): string {
    return this.showPlayButtonText ? 'PLAY' : 'PAUSE';
  }

  startListening(): void {
    return this.showPlayButtonText ? this.playSongGlobal() : this.pauseSong();
  }

  // TODO: Fix logic playling and pausing should only be per playlist
  playSongGlobal(): void {
    this.spotifyPlaybackService.currentPlaylistPlaying(this.playlist.id);
    if (this.state.position > 0 && this.state.track_window.current_track.name
      && this.state.repeat_mode === 0 && this.state.track_window.next_tracks.length > 0) {
      this.spotifyPlaybackService.playSong();
    } else {
      this.spotifyService.playSpotifyTrack(this.tracks, this.tracks[0]['track']).subscribe(() => { });
    }
  }

  playSong(song: SortedTrack): void {
    this.spotifyPlaybackService.currentPlaylistPlaying(this.playlist.id);
    if (this.state.position > 0 && song.title === this.state.track_window.current_track.name) {
      this.spotifyPlaybackService.playSong();
    } else {
      this.spotifyService.playSpotifyTrack(this.tracks, song).subscribe(() => { });
    }
  }

  pauseSong(): void {
    this.spotifyPlaybackService.currentPlaylistPlaying(this.playlist.id);
    this.spotifyPlaybackService.pauseSong();
  }

  showPlayButton(trackToMatch: SortedTrack): void {
    this.tracks.forEach((track: SortedTrack) => {
      if (track === trackToMatch) {
        track.showPlayButton = true;
      }
    });
  }

  hidePlayButton(trackToMatch: SortedTrack): void {
    this.tracks.forEach((track: SortedTrack) => {
      if (track === trackToMatch) {
        track.showPlayButton = false;
      }
    });
  }

  showPauseButton(track: SortedTrack): void {
    track.showPauseButton = true;
  }

  hidePauseButton(track: SortedTrack): void {
    track.showPauseButton = false;
  }

  showTrackNumber(track: SortedTrack): void {
    console.log('or here')

    track.showTrackNumber = true;
  }

  hideTrackNumber(track: SortedTrack): void {
    console.log('sdfsdfdsf')
    track.showTrackNumber = false;
  }
}
