// Angular Material
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

// Common
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

// Components
import { NewPlaylistDialogComponent } from '@dashboard/components/new-playlist-dialog/new-playlist-dialog.component';

// Interfaces
// import { CurrentTrack } from '@app/interfaces/track/track.interface';
import { Playlist } from '@app/interfaces/playlist/playlist.interface';
import { Section } from '@app/interfaces/section/section.interface';
import { SelectedRoute } from '@app/interfaces/route/route.interface';

// Services
import { ApolloService } from '@app/services/apollo/apollo.service';
import { RouteService } from '@app/services/route/route.service';
import { SpotifyPlaybackService } from '@app/services/spotify-playback/spotify-playback.service';
// import { StatusBarService } from '@dashboard/services/status-bar/status-bar.service';
import { UtilService } from '@app/services/util/util.service';
import { Store } from '@ngrx/store';
import { PlaylistsApiActions } from '@dashboard/store/actions/playlist.action';
import { selectUrl } from '@app/store/selectors/router.selectors';
import { getAllPlaylists, getCanLoadMore, getPlaylistsLoaded, getPlaylistsLoading, getSelectedPlaylist } from '@dashboard/store/selectors/playlists.selectors';

@Component({
  selector: 'app-spotify-navigation-menu',
  templateUrl: './spotify-navigation-menu.component.html',
  styleUrls: ['./spotify-navigation-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SpotifyNavigationMenuComponent implements OnInit, OnDestroy {
  public selectedUrl$: Observable<string>;
  public playlists$: Observable<Array<Playlist>>;
  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public selectedPlaylist$: Observable<Playlist | {}>;
  // private currentTrack: CurrentTrack;
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
  public routerSubscription: Subscription;
  public currentPlaylist: string;

  constructor(
    // private statusBarService: StatusBarService,
    public dialog: MatDialog,
    private router: Router,
    public utilService: UtilService,
    public apolloService: ApolloService,
    private routeService: RouteService,
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
      },
      {
        label: 'Your Library',
        iconName: 'library_books',
        url: '/dashboard/collections'
      }
    ];
    // TODO: Fix these selectors
    this.selectedUrl$ = this.store.select(selectUrl);
    this.playlists$ = this.store.select(getAllPlaylists);
    this.loaded$ = this.store.select(getPlaylistsLoaded);
    this.loading$ = this.store.select(getPlaylistsLoading);
    this.selectedPlaylist$ = this.store.select(getSelectedPlaylist);
    this.canLoadMore$ = this.store.select(getCanLoadMore);
    this.store.dispatch(PlaylistsApiActions.loadPlaylists());
    // TODO: Not used
    // this.currentTrackSubscription = this.statusBarService.currentTrack$.subscribe((value: CurrentTrack) => this.currentTrack = value);
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: any) => {
        console.log(event)
        this.selectedRoute = this.routeService.parseUrl(event.url);
      });

    this.getPlaylistIdSubscription = this.spotifyPlaybackService.currentPlaylistPlaying$
      .subscribe((id: string) => this.currentPlaylist = id);

    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.panelClass = 'new-playlist-panel';
    this.dialogConfig.height = '300px';
    this.dialogConfig.width = '800px';
  }

  ngOnDestroy(): void {
    this.currentTrackSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  goToTracks(playlist: Playlist): void {
    // TODO: fix selected playlist logic
    // this.playlists.forEach(tt => tt['selected'] = false);
    // playlist['selected'] = true;
    this.store.dispatch(PlaylistsApiActions.updateSelectedPlaylist({ payload: playlist }));
    const playlistId = encodeURI(playlist.id);
    this.router.navigate(['dashboard', 'playlist', playlistId]);
  }

  goToSection(url: string): void {
    this.router.navigate([url]);
  }

  openNewPlaylistModal(): void {
    this.dialog.open(NewPlaylistDialogComponent, this.dialogConfig);
  }

  loadMorePlaylists(): void {
    this.store.dispatch(PlaylistsApiActions.loadPlaylistsByURL());
  }
}
