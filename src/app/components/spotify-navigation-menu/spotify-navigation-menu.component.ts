import { Component, OnInit } from '@angular/core';
import { first, filter } from 'rxjs/operators';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { StatusBarService } from '../../services/status-bar/status-bar.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewPlaylistDialogComponent } from '../new-playlist-dialog/new-playlist-dialog.component';
import { Router, NavigationStart } from '@angular/router';
import { SpotifyPlaylistRespose } from '../../interfaces/playlist/spotifyPlaylistResponse.interface';
import { CurrentTrack } from '../../interfaces/track/current-track.interface';
import { UtilService } from '../../services/util/util.service';
import { Playlist } from '../../interfaces/playlist/playlist.interface';
import { ApolloService } from '../../services/apollo/apollo.service';
import { RouteService } from '../../services/route/route.service';

@Component({
  selector: 'app-spotify-navigation-menu',
  templateUrl: './spotify-navigation-menu.component.html',
  styleUrls: ['./spotify-navigation-menu.component.scss'],
  animations: [
    trigger('trackAlbumImage', [
      state('active', style({
        transform: 'translateY(0)'
      })),
      state('inactive', style({
        transform: 'translateY(1000px)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class SpotifyNavigationMenuComponent implements OnInit {
  public playlists: Array<Playlist> = [];
  public loading: boolean;
  public playlistsLoaded: boolean;
  public selectedPlaylist: string;
  public isPictureEnlarged: boolean;
  public currentTrack: CurrentTrack;
  public imageEnlargeState: string;
  public playlistTotal: Number;
  public nextPlaylist: String;
  public loadMorePlaylist: Boolean;
  public url: string;

  constructor(
    private playlistService: PlaylistService,
    private statusBarService: StatusBarService,
    public dialog: MatDialog,
    private router: Router,
    public utilService: UtilService,
    public apolloService: ApolloService,
    private routeService: RouteService) {}

  ngOnInit() {
    this.loading = true;
    this.playlistsLoaded = false;
    this.selectedPlaylist = '';
    this.imageEnlargeState = 'inactive';
    this.isPictureEnlarged = false;
    this.statusBarService.enlargePicture$.subscribe((value: Object) => {
      this.isPictureEnlarged = value['value'];
      this.imageEnlargeState = value['value'] ? 'active' : 'inactive';
      this.url = value['url'];
    });
    this.statusBarService.currentTrack$.subscribe((value: CurrentTrack) => this.currentTrack = value);
    this.playlistService.selectPlaylist$.subscribe((playlist: string) => this.selectedPlaylist = playlist);
    this.apolloService.getPlaylists().pipe(first())
      .subscribe((data: SpotifyPlaylistRespose) => {
        if (data.items) {
          data.items.forEach((playlist: Playlist) => {
            if (playlist.name === this.selectedPlaylist) {
              playlist.selected = true;
            } else {
              playlist.selected = false;
            }
          });
          this.loading = false;
          this.playlistsLoaded = true;
          this.playlists = data.items;
          this.playlistTotal = data.total;
          this.nextPlaylist = data.next;
        }
      });
      this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event: NavigationStart) => {
        console.log(event);
        // TODO: finish logic for parsing the url
        this.routeService.parseUrl(event.url);
      });
  }

  goToTracks(playlist): void {
    this.playlists.forEach(tt => tt['selected'] = false);
    playlist['selected'] = true;
    const playlistName = encodeURI(playlist.name.toLowerCase());
    const playlistId = encodeURI(playlist.id);
    const url = this.utilService.encodeSpecialSymbols(`/playlist/${playlistName}/${playlistId}`);
    this.router.navigateByUrl(url);
  }

  goToLibrary(): void {
    this.router.navigate(['library']);
  }

  shrinkPicture(url): void {
    this.statusBarService.enlargePicture(false, url);
  }

  openNewPlaylistModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'new-playlist-panel';
    dialogConfig.height = '480px';
    dialogConfig.width = '800px';
    this.dialog.open(NewPlaylistDialogComponent, dialogConfig);
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
        });
        this.loadMorePlaylist = false;
        this.playlists = this.playlists.concat(data.items);
        this.playlistTotal = data.total;
        this.nextPlaylist = data.next;
      });
  }
}
