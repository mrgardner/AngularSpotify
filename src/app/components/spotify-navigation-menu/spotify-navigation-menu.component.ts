import { Component, OnInit, OnDestroy } from '@angular/core';
import { first, filter } from 'rxjs/operators';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { StatusBarService } from '../../services/status-bar/status-bar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewPlaylistDialogComponent } from '../new-playlist-dialog/new-playlist-dialog.component';
import { Router, NavigationStart } from '@angular/router';
import { SpotifyPlaylistRespose } from '../../interfaces/playlist/spotifyPlaylistResponse.interface';
import { CurrentTrack } from '../../interfaces/track/current-track.interface';
import { UtilService } from '../../services/util/util.service';
import { Playlist } from '../../interfaces/playlist/playlist.interface';
import { ApolloService } from '../../services/apollo/apollo.service';
import { RouteService } from '../../services/route/route.service';
import { SpotifyPlaybackService } from 'src/app/services/spotify-playback/spotify-playback.service';
import { SelectedRoute } from 'src/app/interfaces/route/selectedRoute.interface';
import { Section } from 'src/app/interfaces/section/section.interface';

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
  public playlistTotal: Number;
  public nextPlaylist: String;
  public loadMorePlaylist: Boolean;
  public url: string;
  public sections: Array<Section>;
  public selectedRoute: SelectedRoute;
  public dialogConfig: any;
  public currentTrackSubscription: any;
  public selectPlaylistSubscription: any;
  public getPlaylistsSubscription: any;
  public getPlaylistIdSubscription: any;
  public routerSubscription: any;
  public currentPlaylist: string;

  constructor(
    private playlistService: PlaylistService,
    private statusBarService: StatusBarService,
    public dialog: MatDialog,
    private router: Router,
    public utilService: UtilService,
    public apolloService: ApolloService,
    private routeService: RouteService,
    private spotifyPlaybackService: SpotifyPlaybackService) {}

  ngOnInit(): void {
    this.sections = [
      {
        label: 'Home',
        iconName: 'home',
        url: 'home'
      },
      {
        label: 'Search',
        iconName: 'search',
        url: 'search'
      },
      {
        label: 'Your Library',
        iconName: 'library_books',
        url: 'collection'
      }
    ];
    this.loading = true;
    this.playlistsLoaded = false;
    this.selectedPlaylist = '';
    this.currentTrackSubscription = this.statusBarService.currentTrack$.subscribe((value: CurrentTrack) => this.currentTrack = value);
    this.selectPlaylistSubscription = this.playlistService.selectPlaylist$
      .subscribe((playlist: string) => this.selectedPlaylist = playlist);
    this.getPlaylistsSubscription = this.apolloService.getPlaylists().pipe(first())
      .subscribe((data: SpotifyPlaylistRespose) => {
        if (data.items) {
          data.items.forEach((playlist: Playlist) => {
            if (playlist.name === this.selectedPlaylist) {
              playlist.selected = true;
            } else {
              playlist.selected = false;
            }
            playlist.selectedUrl = playlist.name.toLowerCase();
            playlist.id = playlist.id;
          });
          this.loading = false;
          this.playlistsLoaded = true;
          this.playlists = data.items;
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
    const url = this.utilService.encodeSpecialSymbols(`/playlist/${playlistName}/${playlistId}`);
    this.router.navigateByUrl(url);
  }

  goToSection(url: string): void {
    this.router.navigate([url]);
  }

  openNewPlaylistModal(): void {
    this.dialog.open(NewPlaylistDialogComponent, this.dialogConfig);
  }

  loadMorePlaylists(playlistLength: Number): void {
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
