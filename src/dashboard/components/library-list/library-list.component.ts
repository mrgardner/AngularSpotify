import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Params } from '@angular/router';
import { PlaylistInfo } from '@app/interfaces/playlist/playlist.interface';
import { ApolloService } from '@app/services/apollo/apollo.service';
import { UtilService } from '@app/services/util/util.service';
import { selectRouteParams } from '@app/store/selectors/router.selectors';
import { PlaylistsApiActions } from '@dashboard/store/actions/playlists.action';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LibraryListComponent implements OnInit {
  public selectedUrl$: Observable<string>;
  public selectedPlaylist$: Observable<Params>;
  public loadMorePlaylist: boolean;
  public url: string;
  public dialogConfig: MatDialogConfig;
  public currentTrackSubscription: Subscription;
  public getPlaylistIdSubscription: Subscription;
  public currentPlaylist: string;

  @Input() list: Observable<any>;
  @Input() loading: Observable<boolean>;
  @Input() loaded: Observable<boolean>;
  @Input() canLoadMore: Observable<boolean>;
  @Input() type: Observable<string>;

  constructor(
    public dialog: MatDialog,
    public utilService: UtilService,
    public apolloService: ApolloService,
    private store: Store
  ) {
  }

  /*
  TODO: 1. fix selecting of playlists (green bar next to name)
  TODO: 2. Refactor / remove old code
  **/
  ngOnInit(): void {
    this.selectedPlaylist$ = this.store.select(selectRouteParams);

    // TODO: Not used
    // this.currentTrackSubscription = this.statusBarService.currentTrack$.subscribe((value: CurrentTrack) => this.currentTrack = value);
  }

  goToTracks(playlist: PlaylistInfo): void {
    this.store.dispatch(PlaylistsApiActions.updateSelectedPlaylist({ payload: playlist }));
  }

  loadMorePlaylists(): void {
    this.store.dispatch(PlaylistsApiActions.loadPlaylists());
  }
}