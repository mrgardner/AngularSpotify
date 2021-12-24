// Angular Material
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

// Common
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

// Components
import { NewPlaylistDialogComponent } from '@side-nav/components/new-playlist-dialog/new-playlist-dialog.component';

// Interfaces
import { CurrentTrack } from '@core/interfaces/track/track.interface';
import { Playlist } from '@core/interfaces/playlist/playlist.interface';
import { Section } from '@core/interfaces/section/section.interface';
import { SelectedRoute } from '@core/interfaces/route/route.interface';

// Services
import { ApolloService } from '@core/services/apollo/apollo.service';
import { RouteService } from '@core/services/route/route.service';
import { SpotifyPlaybackService } from '@core/services/spotify-playback/spotify-playback.service';
import { StatusBarService } from '@bottom-bar/services/status-bar/status-bar.service';
import { UtilService } from '@core/services/util/util.service';
import { Store } from '@ngrx/store';
import * as fromStore from '@side-nav/store';


@Component({
  selector: 'app-spotify-navigation-menu',
  templateUrl: './spotify-navigation-menu.component.html',
  styleUrls: ['./spotify-navigation-menu.component.scss']
})
export class SpotifyNavigationMenuComponent implements OnInit, OnDestroy {
  public playlists$: Observable<Array<Playlist>>;
  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public selectedPlaylist$: Observable<string>;
  public currentTrack: CurrentTrack;
  public playlistTotal$: Observable<number>;
  public nextPlaylist$: Observable<string>;
  public canLoadMore$: Observable<boolean>;
  public loadMorePlaylist: boolean;
  public url: string;
  public sections: Array<Section>;
  public selectedRoute: SelectedRoute;
  public dialogConfig: MatDialogConfig;
  public currentTrackSubscription: Subscription;
  public getPlaylistsSubscription: Subscription;
  public getPlaylistIdSubscription: Subscription;
  public routerSubscription: Subscription;
  public currentPlaylist: string;

  constructor(
    private statusBarService: StatusBarService,
    public dialog: MatDialog,
    private router: Router,
    public utilService: UtilService,
    public apolloService: ApolloService,
    private routeService: RouteService,
    private spotifyPlaybackService: SpotifyPlaybackService,
    private store: Store) { }

  /*
  TODO: 1. fix routing to playlist
  TODO: 2. fix selecting of playlists (green bar next to name)
  TODO: 3. Refactor / remove old code
  **/
  ngOnInit(): void {
    this.sections = [
      {
        label: 'Home',
        iconName: 'home',
        url: 'dashboard'
      },
      {
        label: 'Search',
        iconName: 'search',
        url: 'search'
      },
      {
        label: 'Your Library',
        iconName: 'library_books',
        url: 'collections'
      }
    ];
    this.playlists$ = this.store.select(fromStore.getAllPlaylists);
    this.loaded$ = this.store.select(fromStore.getPlaylistsLoaded);
    this.loading$ = this.store.select(fromStore.getPlaylistsLoading);
    this.selectedPlaylist$ = this.store.select(fromStore.getSelectedPlaylist);
    this.canLoadMore$ = this.store.select(fromStore.getCanLoadMore);
    this.store.dispatch(new fromStore.LoadPlaylists());
    // TODO: Not used
    this.currentTrackSubscription = this.statusBarService.currentTrack$.subscribe((value: CurrentTrack) => this.currentTrack = value);
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
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
    this.getPlaylistsSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  goToTracks(playlist: Playlist): void {
    // this.playlists.forEach(tt => tt['selected'] = false);
    // playlist['selected'] = true;
    console.log(playlist);
    this.store.dispatch(new fromStore.UpdateSelectedPlaylist(playlist.selectedUrl));
    // const playlistName = encodeURI(playlist.name.toLowerCase());
    // const playlistId = encodeURI(playlist.id);
    // const url = this.utilService.encodeSpecialSymbols(`/playlists/${playlistName}/${playlistId}`);
    // this.router.navigateByUrl(url);
  }

  goToSection(url: string): void {
    this.router.navigate([url]);
  }

  openNewPlaylistModal(): void {
    this.dialog.open(NewPlaylistDialogComponent, this.dialogConfig);
  }

  loadMorePlaylists(): void {
    this.store.dispatch(new fromStore.LoadPlaylistsByURL);
    // const owner = String(this.nextPlaylist).split('users/')[1].split('/playlists')[0];
    // const baseURI = `https://api.spotify.com/v1/users/${owner}/playlists?offset=${playlistLength}&limit=50`;
    // this.loadMorePlaylist = true;
    // this.apolloService.getPlaylists(baseURI).pipe(first())
    //   .subscribe((data: SpotifyPlaylistRespose) => {
    // data.items.forEach((playlist: Playlist) => {
    //   if (playlist.name === this.selectedPlaylist) {
    //     playlist.selected = true;
    //   } else {
    //     playlist.selected = false;
    //   }
    //   playlist.selectedUrl = playlist.name.toLowerCase();
    // });
    // this.loadMorePlaylist = false;
    // this.playlists = this.playlists.concat(data.items);
    // this.playlistTotal = data.total;
    // this.nextPlaylist = data.next;
    // });
  }
}
