// Angular Material
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

// Common
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';

// Components
import { NewPlaylistDialogComponent } from '@side-nav/components/new-playlist-dialog/new-playlist-dialog.component';

// Interfaces
import { CurrentTrack } from '@core/interfaces/track/track.interface';
import { Playlist } from '@core/interfaces/playlist/playlist.interface';
import { Section } from '@core/interfaces/section/section.interface';
import { SelectedRoute } from '@core/interfaces/route/route.interface';
import { SpotifyPlaylistRespose } from '@core/interfaces/playlist/playlist.interface';

// Services
import { ApolloService } from '@core/services/apollo/apollo.service';
import { PlaylistService } from '@playlists/services/playlist/playlist.service';
import { RouteService } from '@core/services/route/route.service';
import { SpotifyPlaybackService } from '@core/services/spotify-playback/spotify-playback.service';
import { StatusBarService } from '@bottom-bar/services/status-bar/status-bar.service';
import { UtilService } from '@core/services/util/util.service';


@Component({
  selector: 'app-spotify-navigation-menu',
  templateUrl: './spotify-navigation-menu.component.html',
  styleUrls: ['./spotify-navigation-menu.component.scss']
})
export class SpotifyNavigationMenuComponent implements OnInit, OnDestroy {
  public playlists: Array<Playlist> = [];
  public loading: boolean;
  public playlistsLoaded: boolean;
  public selectedPlaylist: string;
  public currentTrack: CurrentTrack;
  public playlistTotal: number;
  public nextPlaylist: string;
  public loadMorePlaylist: boolean;
  public url: string;
  public sections: Array<Section>;
  public selectedRoute: SelectedRoute;
  public dialogConfig: MatDialogConfig;
  public currentTrackSubscription: Subscription;
  public selectPlaylistSubscription: Subscription;
  public getPlaylistsSubscription: Subscription;
  public getPlaylistIdSubscription: Subscription;
  public routerSubscription: Subscription;
  public currentPlaylist: string;

  constructor(
    private playlistService: PlaylistService,
    private statusBarService: StatusBarService,
    public dialog: MatDialog,
    private router: Router,
    public utilService: UtilService,
    public apolloService: ApolloService,
    private routeService: RouteService,
    private spotifyPlaybackService: SpotifyPlaybackService) { }

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
    this.loading = true;
    this.playlistsLoaded = false;
    this.selectedPlaylist = '';
    // TODO: Not used
    this.currentTrackSubscription = this.statusBarService.currentTrack$.subscribe((value: CurrentTrack) => this.currentTrack = value);
    this.selectPlaylistSubscription = this.playlistService.selectPlaylist$
      .subscribe((playlist: string) => this.selectedPlaylist = playlist);
    this.getPlaylistsSubscription = this.apolloService.getPlaylists().pipe(first())
      .subscribe((data: SpotifyPlaylistRespose) => {
        if (data.items) {
          this.playlists = data.items.map((playlist: Playlist) => {
            let selected = false;
            if (playlist.name === this.selectedPlaylist) {
              selected = true;
            }
            const selectedUrl = playlist.name.toLowerCase();
            return { ...playlist, selected, selectedUrl };
          });
          this.loading = false;
          this.playlistsLoaded = true;
          this.playlistTotal = data.total;
          this.nextPlaylist = data.next;
        }
      });
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
    this.selectPlaylistSubscription.unsubscribe();
    this.getPlaylistsSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  goToTracks(playlist): void {
    this.playlists.forEach(tt => tt['selected'] = false);
    playlist['selected'] = true;
    const playlistName = encodeURI(playlist.name.toLowerCase());
    const playlistId = encodeURI(playlist.id);
    const url = this.utilService.encodeSpecialSymbols(`/playlists/${playlistName}/${playlistId}`);
    this.router.navigateByUrl(url);
  }

  goToSection(url: string): void {
    this.router.navigate([url]);
  }

  openNewPlaylistModal(): void {
    this.dialog.open(NewPlaylistDialogComponent, this.dialogConfig);
  }

  loadMorePlaylists(playlistLength: number): void {
    const owner = String(this.nextPlaylist).split('users/')[1].split('/playlists')[0];
    const baseURI = `https://api.spotify.com/v1/users/${owner}/playlists?offset=${playlistLength}&limit=50`;
    this.loadMorePlaylist = true;
    this.apolloService.getPlaylists(baseURI).pipe(first())
      .subscribe((data: SpotifyPlaylistRespose) => {
        data.items.forEach((playlist: Playlist) => {
          if (playlist.name === this.selectedPlaylist) {
            playlist.selected = true;
          } else {
            playlist.selected = false;
          }
          playlist.selectedUrl = playlist.name.toLowerCase();
        });
        this.loadMorePlaylist = false;
        this.playlists = this.playlists.concat(data.items);
        this.playlistTotal = data.total;
        this.nextPlaylist = data.next;
      });
  }
}
