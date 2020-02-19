import { Component, OnInit, AfterContentInit, ViewChild, OnDestroy } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { SortedTrack } from '../../interfaces/track/track.interface';
import { SpotifyPlaybackService } from '../../services/spotify-playback/spotify-playback.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Playlist } from '../../interfaces/playlist/playlist.interface';
import { PlaylistDataSourceService } from '../../services/playlist-data-source/playlist-data-source.service';
import { UtilService } from '../../services/util/util.service';
import { TrackService } from '../../services/track/track.service';
import { SpotifySongResponse } from '../../interfaces/song/song.interface';
import { ApolloService } from '../../services/apollo/apollo.service';
import { moveItemInArray, CdkDropList, CdkDrag} from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
import { DragSource, DropData } from 'src/app/interfaces/drag-and-drop/drag-and-drop.interface';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss']
})
export class PlaylistTableComponent implements OnInit, AfterContentInit, OnDestroy {
  public tracks: Array<SortedTrack> = [];
  public loading: boolean;
  public tracksLoaded: boolean;
  public checkDuplicate: boolean;
  public playlist: Playlist;
  public currentTrack: SortedTrack;
  public displayedColumns: string[] = ['dupTrack', 'trackPlaying', 'title', 'artist', 'album', 'added_at', 'time'];
  public dataSource: PlaylistDataSourceService;
  public selection = new SelectionModel<SortedTrack>(true, []);
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
  @ViewChild(MatTable, {static: true}) table: MatTable<Array<SortedTrack>>;
  @ViewChild(CdkDropList) _dropList: CdkDropList;

  constructor(
    private apolloService: ApolloService,
    private spotifyService: SpotifyService,
    private router: Router,
    private spotifyPlaybackService: SpotifyPlaybackService,
    public utilService: UtilService,
    private trackService: TrackService,
    private route: ActivatedRoute) {}

  // TODO: Add functionality to save drag and drop to spotify endpoint
  dropTable(event: DropData) {
    if (this.dataSource) {
      this.dataSource.tableSubject$.subscribe((v: Array<any>) => {
        const prevIndex = v.findIndex((d) => d === event.item.data);
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
      this.dataSource.tableSubject$.subscribe((v: Array<any>) => {
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

    this.routerSubscription = this.route.url.pipe(switchMap((tt) => {
      if (tt.length === 3) {
        this.dataSource.loadTracks(tt[2].path);
        this.endOfChain = false;
        return this.apolloService.getPlaylist(tt[2].path);
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

    this.filterSubscription = this.trackService.filterTrack$.subscribe(track => {
      this.filterText = track;
      this.dataSource.filter(track);
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
    const breadcrumbs = this.router.url.split('/');
    this.dataSource.loadTracks(breadcrumbs[3], this.paginator.pageIndex, this.paginator.pageSize);
  }

  getDisplayedColumns(): string[] {
    let columns = this.displayedColumns;

    if (!this.checkDuplicate) {
      columns = columns.filter(col => {
        return col !== 'dupTrack';
      });
    }

    return columns;
  }

  sortData(sort: Sort): void {
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
      this.spotifyService.playSpotifyTrack(this.tracks, this.tracks[0]['track']).subscribe(() => {});
    }
  }

  playSong(song: SortedTrack): void {
    this.spotifyPlaybackService.currentPlaylistPlaying(this.playlist.id);
    if (this.state.position > 0 && song.title === this.state.track_window.current_track.name) {
      this.spotifyPlaybackService.playSong();
    } else {
      this.spotifyService.playSpotifyTrack(this.tracks, song).subscribe(() => {});
    }
  }

  pauseSong(): void {
    this.spotifyPlaybackService.currentPlaylistPlaying(this.playlist.id);
    this.spotifyPlaybackService.pauseSong();
  }

  showPlayButton(track: SortedTrack): void {
    this.tracks.forEach(t => {
      if (t === track) {
        t.showPlayButton = true;
      }
    });
  }

  hidePlayButton(track: SortedTrack): void {
    this.tracks.forEach(t => {
      if (t === track) {
        t.showPlayButton = false;
      }
    });
  }

  showPauseButton(track: SortedTrack): void {
    track.showPauseButton = true;
  }

  hidePauseButton(track: SortedTrack): void {
    track.showPauseButton = false;
  }
}
