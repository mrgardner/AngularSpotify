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
import { AlbumsApiActions } from '@dashboard/store/actions/album.action';
import { ArtistsApiActions } from '@dashboard/store/actions/artists.action';
import { PlaylistsApiActions } from '@dashboard/store/actions/playlists.action';
import { PodcastsApiActions } from '@dashboard/store/actions/podcasts.action';
import { selectAlbums, selectAlbumsType, selectCanLoadMoreAlbums, selectLoadedAlbums, selectLoadingAlbums } from '@dashboard/store/selectors/albums.selectors';
import { selectArtists, selectArtistsType, selectCanLoadMoreArtists, selectLoadedArtists, selectLoadingArtists } from '@dashboard/store/selectors/artists.selectors';
import { selectCanLoadMorePlaylists, selectLoadedPlaylists, selectLoadingPlaylists, selectPlaylists, selectPlaylistsType } from '@dashboard/store/selectors/playlists.selectors';
import { selectCanLoadMorePodcasts, selectLoadedPodcasts, selectLoadingPodcasts, selectPodcasts, selectPodcastsType } from '@dashboard/store/selectors/podcasts.selectors';
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
  public type$: Observable<string>;
  public loadMorePlaylist: boolean;
  public url: string;
  public sections: Array<Section>;
  public selectedRoute: SelectedRoute;
  public dialogConfig: MatDialogConfig;
  public currentTrackSubscription: Subscription;
  public getPlaylistIdSubscription: Subscription;
  public currentPlaylist: string;

  public list$: Observable<Array<any>>;

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
    // this.playlists$ = this.store.select(selectPlaylists);
    // this.loaded$ = this.store.select(selectLoadedPlaylists);
    // this.loading$ = 
    this.selectedPlaylist$ = this.store.select(selectRouteParams);
    // this.canLoadMore$ = this.store.select(selectCanLoadMorePlaylists);

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

  loadPlaylists(): void {
    this.store.dispatch(PlaylistsApiActions.loadPlaylists());
    this.list$ = this.store.select(selectPlaylists);
    this.loading$ = this.store.select(selectLoadingPlaylists);
    this.loaded$ = this.store.select(selectLoadedPlaylists);
    this.canLoadMore$ = this.store.select(selectCanLoadMorePlaylists);
    this.type$ = this.store.select(selectPlaylistsType);
  }

  loadAlbums(): void {
    this.store.dispatch(AlbumsApiActions.loadAlbums());
    this.list$ = this.store.select(selectAlbums);
    this.loading$ = this.store.select(selectLoadingAlbums);
    this.loaded$ = this.store.select(selectLoadedAlbums);
    this.canLoadMore$ = this.store.select(selectCanLoadMoreAlbums);
    this.type$ = this.store.select(selectAlbumsType);
  }

  loadArtists(): void {
    this.store.dispatch(ArtistsApiActions.loadArtists());
    this.list$ = this.store.select(selectArtists);
    this.loading$ = this.store.select(selectLoadingArtists);
    this.loaded$ = this.store.select(selectLoadedArtists);
    this.canLoadMore$ = this.store.select(selectCanLoadMoreArtists);
    this.type$ = this.store.select(selectArtistsType);
  }

  loadPodcasts(): void {
    this.store.dispatch(PodcastsApiActions.loadPodcasts());
    this.list$ = this.store.select(selectPodcasts);
    this.loading$ = this.store.select(selectLoadingPodcasts);
    this.loaded$ = this.store.select(selectLoadedPodcasts);
    this.canLoadMore$ = this.store.select(selectCanLoadMorePodcasts);
    this.type$ = this.store.select(selectPodcastsType);
  }
}