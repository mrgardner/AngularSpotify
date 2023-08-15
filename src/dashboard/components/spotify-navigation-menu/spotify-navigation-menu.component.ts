import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Params, Router } from '@angular/router';
import { PlaylistInfo } from '@app/interfaces/playlist/playlist.interface';
import { SelectedRoute } from '@app/interfaces/route/route.interface';
import { Section } from '@app/interfaces/section/section.interface';
import { ApolloService } from '@app/services/apollo/apollo.service';
import { SpotifyPlaybackService } from '@app/services/spotify-playback/spotify-playback.service';
import { UtilService } from '@app/services/util/util.service';
import { selectRouteParams, selectUrl } from '@app/store/selectors/router.selectors';
import { NewPlaylistDialogComponent } from '@dashboard/components/new-playlist-dialog/new-playlist-dialog.component';
import { PlaylistsApiActions } from '@dashboard/store/actions/playlists.action';
import { selectCanLoadMore, selectPlaylists, selectPlaylistsLoaded, selectPlaylistsLoading } from '@dashboard/store/selectors/playlists.selectors';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-spotify-navigation-menu',
  templateUrl: './spotify-navigation-menu.component.html',
  styleUrls: ['./spotify-navigation-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SpotifyNavigationMenuComponent implements OnInit {
  public selectedUrl$: Observable<string>;
  public playlists$: Observable<Array<PlaylistInfo>>;
  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public selectedPlaylist$: Observable<Params>;
  public playlistTotal$: Observable<number>;
  public nextPlaylist$: Observable<string>;
  public canLoadMore$: Observable<boolean>;
  public loadMorePlaylist: boolean;
  public url: string;
  public sections: Array<Section>;
  public selectedRoute: SelectedRoute;
  public dialogConfig: MatDialogConfig;
  public currentTrackSubscription: Subscription;
  public getPlaylistIdSubscription: Subscription;
  public currentPlaylist: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public utilService: UtilService,
    public apolloService: ApolloService,
    private spotifyPlaybackService: SpotifyPlaybackService,
    private store: Store
  ) {
  }

  /*
  TODO: 1. fix selecting of playlists (green bar next to name)
  TODO: 2. Refactor / remove old code
  **/
  ngOnInit(): void {
    this.selectedRoute = {
      parent: '',
      child: '',
      id: ''
    };
    this.sections = [
      {
        label: 'Home',
        iconName: 'home',
        url: '/dashboard'
      },
      {
        label: 'Search',
        iconName: 'search',
        url: '/dashboard/search'
      }
    ];
    this.selectedUrl$ = this.store.select(selectUrl);
    this.playlists$ = this.store.select(selectPlaylists);
    this.loaded$ = this.store.select(selectPlaylistsLoaded);
    this.loading$ = this.store.select(selectPlaylistsLoading);
    this.selectedPlaylist$ = this.store.select(selectRouteParams);
    this.canLoadMore$ = this.store.select(selectCanLoadMore);
    this.store.dispatch(PlaylistsApiActions.loadPlaylists());
    // TODO: Not used
    // this.currentTrackSubscription = this.statusBarService.currentTrack$.subscribe((value: CurrentTrack) => this.currentTrack = value);

    this.getPlaylistIdSubscription = this.spotifyPlaybackService.currentPlaylistPlaying$
      .subscribe((id: string) => this.currentPlaylist = id);

    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.panelClass = 'new-playlist-panel';
    this.dialogConfig.height = '300px';
    this.dialogConfig.width = '800px';
  }

  goToTracks(playlist: PlaylistInfo): void {
    this.store.dispatch(PlaylistsApiActions.updateSelectedPlaylist({ payload: playlist }));
  }

  goToSection(url: string): void {
    this.router.navigate([url]);
  }

  openNewPlaylistModal(): void {
    this.dialog.open(NewPlaylistDialogComponent, this.dialogConfig);
  }

  loadMorePlaylists(): void {
    this.store.dispatch(PlaylistsApiActions.loadPlaylists());
  }
}