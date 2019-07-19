import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { concat, of } from 'rxjs';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { StatusBarService } from '../../services/status-bar/status-bar.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewPlaylistDialogComponent } from '../new-playlist-dialog/new-playlist-dialog.component';
import { Router } from '@angular/router';
import { SpotifyPlaylistRespose } from '../../interfaces/playlist/spotifyPlaylistResponse.interface';
import { CurrentTrack } from '../../interfaces/track/current-track.interface';
import { UtilService } from '../../services/util/util.service';
import { Playlist } from '../../interfaces/playlist/playlist.interface';
import { ApolloService } from '../../services/apollo/apollo.service';

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

  constructor(
    private spotifyService: SpotifyService,
    private playlistService: PlaylistService,
    private statusBarService: StatusBarService,
    public dialog: MatDialog,
    private router: Router,
    public utilService: UtilService,
    public apolloService: ApolloService) {}

  ngOnInit() {
    this.selectedPlaylist = '';
    this.imageEnlargeState = 'inactive';
    this.isPictureEnlarged = false;
    this.statusBarService.enlargePicture$.subscribe((value: boolean) => {
      this.isPictureEnlarged = value;
      this.imageEnlargeState = value ? 'active' : 'inactive';
    });
    this.statusBarService.currentTrack$.subscribe((value: CurrentTrack) => this.currentTrack = value);
    this.playlistService.selectPlaylist$.subscribe((playlist: string) => this.selectedPlaylist = playlist);
    this.apolloService.getPlaylists()
      // .pipe(
      //   switchMap((playlistInfo: SpotifyPlaylistRespose) => {
      //     this.loading = true;
      //     this.playlistsLoaded = false;
      //     if (playlistInfo.total > 0) {
      //       const tempList = [];
      //       const playlistsLength = playlistInfo.total;
      //       const owner = String(playlistInfo.next).split('users/')[1].split('/playlists')[0];
      //       const numberOfTimesToLoop = Math.ceil(playlistsLength / 50);
      //       console.log(numberOfTimesToLoop);
      //       for (let i = 0; i < numberOfTimesToLoop; i++) {
      //         const baseURI = `https://api.spotify.com/v1/users/${owner}/playlists?offset=${i * 50}&limit=50`;
      //         tempList.push(this.apolloService.getPlaylists(baseURI));
      //       }
      //       console.log();
      //       return concat(...tempList);
      //     } else {
      //       this.loading = false;
      //       this.playlistsLoaded = true;
      //       return of();
      //     }
      //   })
      // )
      .subscribe((data: SpotifyPlaylistRespose) => {
        console.log(data);
        data.items.forEach((playlist: Playlist) => {
          if (playlist.name === this.selectedPlaylist) {
            playlist.selected = true;
          } else {
            playlist.selected = false;
          }
        });
        if (data.testing || !data.next) {
          this.loading = false;
          this.playlistsLoaded = true;
        }
        this.loading = false;
        this.playlistsLoaded = true;
        this.playlists = this.playlists.concat(data.items);
        console.log(this.playlists);
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

  goToSavedAlbums(): void {
    this.router.navigate(['library/albums']);
  }

  shrinkPicture(): void {
    this.statusBarService.enlargePicture(false);
  }

  openNewPlaylistModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'new-playlist-panel';
    dialogConfig.height = '480px';
    dialogConfig.width = '800px';
    this.dialog.open(NewPlaylistDialogComponent, dialogConfig);
  }
}
