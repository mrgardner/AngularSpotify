import { SelectionModel } from '@angular/cdk/collections';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Playlist } from '@app/interfaces/playlist/playlist.interface';
import { SpotifySongResponse } from '@app/interfaces/song/song.interface';
import { SortedTrack } from '@app/interfaces/track/track.interface';
import { SpotifyPlaybackService } from '@app/services/spotify-playback/spotify-playback.service';
import { UtilService } from '@app/services/util/util.service';
import { selectRouteParams } from '@app/store/selectors/router.selectors';
import { Store } from '@ngrx/store';
import { PlaylistApiActions } from '@playlist/store/actions/playlist.action';
import { selectFollowers, selectImage, selectLoaded, selectLoading, selectName, selectOwner, selectPageSize, selectPublic, selectTracks, selectTracksLength } from '@playlist/store/selectors/playlist.selector';
import { TrackService } from '@tracks/services/track/track.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss']
})
export class PlaylistTableComponent implements OnInit {
  public tracks: SortedTrack[] = [];
  public loading: boolean;
  public tracksLoaded: boolean;
  public checkDuplicate: boolean;
  public playlist: Playlist;
  public currentTrack: SortedTrack;
  public displayedColumns: string[] = ['trackPlaying', 'title', 'album', 'added_at', 'time'];
  public selection: SelectionModel<SortedTrack> = new SelectionModel<SortedTrack>(true, []);
  public tracksLength$: Observable<number>;
  public pageSize$: Observable<number>;
  public state: SpotifySongResponse;
  public routerSubscription: Subscription;
  public checkDuplicateSubscription: Subscription;
  public currentSongStateSubscription: Subscription;
  public currentTrackSubscription: Subscription;
  public showPlayButtonSubscription: Subscription;
  public filterSubscription: Subscription;
  public test: string = '';
  public filterText: string = '';
  public draggedString: string;
  public showPlayButtonText: boolean;
  public playlistTracks$: Observable<SortedTrack[]>;
  public dataSource = new MatTableDataSource<any>();
  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public followers$: Observable<number>;
  public public$: Observable<boolean>;
  public owner$: Observable<string>;
  public name$: Observable<string>;
  public image$: Observable<string>;

  public test1: number = 0;
  public test2: number = 20;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<SortedTrack[]>;
  @ViewChild(CdkDropList) _dropList: CdkDropList;

  constructor(
    private spotifyPlaybackService: SpotifyPlaybackService,
    public utilService: UtilService,
    private trackService: TrackService,
    private store: Store) { }

  // TODO: Add functionality to save drag and drop to spotify endpoint
  // dropTable(event: DropData): void {
  //   if (this.dataSource) {
  //     this.dataSource.tableSubject$.subscribe((v: SortedTrack[]) => {
  //       const prevIndex: number = v.findIndex((d) => d === event.item.data);
  //       moveItemInArray(v, prevIndex, event.currentIndex);
  //       this.tracks = v;
  //       if (v.length > 0) {
  //         this.pageSize = v[0].size;
  //         this.itemCount = v[0].total;
  //       } else {
  //         this.itemCount = 0;
  //       }
  //       this.table.renderRows();
  //     });
  //   } else {
  //     this.endOfChain = true;
  //   }
  // }

  // dragStart(e: DragSource): void {
  //   this.draggedString = `${e.source.data.title} - ${e.source.data.artist}`;
  // }

  ngOnInit(): void {
    this.playlist = {
      collaborative: false,
      external_urls: {
        spotify: ''
      },
      followers: {
        href: '',
        total: 0
      },
      href: '',
      id: '',
      images: [],
      name: '',
      owner: {
        display_name: '',
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        type: '',
        uri: ''
      },
      primary_color: '',
      public: false,
      snapshot_id: '',
      tracks: {
        href: '',
        total: 0
      },
      type: '',
      uri: '',
      selected: false,
      selectedUrl: '',
    }

    this.store.select(selectTracks).subscribe((tracks: SortedTrack[]) => {
      if (tracks.length > 0) {
        this.dataSource.data = tracks;
      }
    });
    this.followers$ = this.store.select(selectFollowers);
    this.loaded$ = this.store.select(selectLoaded);
    this.owner$ = this.store.select(selectOwner);
    this.image$ = this.store.select(selectImage);
    this.name$ = this.store.select(selectName);
    this.public$ = this.store.select(selectPublic);
    this.pageSize$ = this.store.select(selectPageSize);
    this.tracksLength$ = this.store.select(selectTracksLength);
    this.store.select(selectRouteParams).subscribe((routeParam) => {
      this.store.dispatch(PlaylistApiActions.loadPlaylist({ payload: routeParam.playlistId }));
      this.store.dispatch(PlaylistApiActions.loadPlaylistTracks({ payload: routeParam.playlistId }));
    });
    this.loading$ = this.store.select(selectLoading);

    this.checkDuplicateSubscription = this.trackService.checkDuplicate$
      .subscribe((isDuplicate: boolean) => this.checkDuplicate = isDuplicate);
    this.currentSongStateSubscription = this.spotifyPlaybackService.currentSongState$
      .subscribe(state => this.state = state);
    this.currentTrackSubscription = this.spotifyPlaybackService.currentTrack$
      .subscribe((track: SortedTrack) => this.currentTrack = track);

    this.filterSubscription = this.trackService.filterTrack$.subscribe((filterText: string) => {
      this.filterText = filterText;
      this.dataSource.filter = filterText;
    });

    this.showPlayButtonSubscription = this.spotifyPlaybackService.showPlayButton$
      .subscribe((value: boolean) => this.showPlayButtonText = value);
  }

  loadTracks(): void {
    // TODO: Refactor this logic
    // const breadcrumbs: string[] = this.router.url.split('/');
    // this.store.dispatch(PlaylistApiActions.loadPlaylist({
    //   payload: {
    //     playlistId: breadcrumbs[3],
    //     offset: this.paginator.pageIndex,
    //     limit: this.paginator.pageSize
    //   }
    // }))
    // this.dataSource.loadTracks(breadcrumbs[3], this.paginator.pageIndex, this.paginator.pageSize);
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
    // this.dataSource.tableSubject.next(this.tracks);
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
      // this.spotifyService.playSpotifyTrack(this.tracks, this.tracks[0].track).subscribe(() => { });
    }
  }

  playSong(song: SortedTrack): void {
    this.spotifyPlaybackService.currentPlaylistPlaying(this.playlist.id);
    if (this.state.position > 0 && song.title === this.state.track_window.current_track.name) {
      this.spotifyPlaybackService.playSong();
    } else {
      // TODO: add logic or remove if not needed
      // this.spotifyService.playSpotifyTrack(this.tracks, song).subscribe(() => { });
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