import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/internal/operators';
import { concat } from 'rxjs';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { StatusBarService } from '../../services/status-bar/status-bar.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewPlaylistDialogComponent } from '../new-playlist-dialog/new-playlist-dialog.component';
import { Router } from '@angular/router';
import { SpotifyPlaylistRespose } from 'src/app/interfaces/playlist/spotifyPlaylistResponse.interface';
import { CurrentTrack } from 'src/app/interfaces/track/current-track.interface';
import { PlaylistData } from 'src/app/interfaces/playlist/spotfiy-playlist-data.interface';
import { UtilService } from 'src/app/services/util/util.service';

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
  public playlists: Array<SpotifyPlaylistRespose> = [];
  public loading: boolean;
  public playlistsLoaded: boolean;
  private selectedPlaylist: string;
  public isPictureEnlarged: boolean;
  public currentTrack: CurrentTrack;
  public imageEnlargeState: string;

  constructor(
    private spotifyService: SpotifyService,
    private playlistService: PlaylistService,
    private statusBarService: StatusBarService,
    private dialog: MatDialog,
    private router: Router,
    public utilService: UtilService) {}

  ngOnInit() {
    this.selectedPlaylist = '';
    this.imageEnlargeState = 'inactive';
    this.isPictureEnlarged = false;
    this.statusBarService.enlargePicture$.subscribe((value: boolean) => {
      this.isPictureEnlarged = value;
      this.imageEnlargeState = value ? 'active' : 'inactive';
    });
    this.statusBarService.currenttrack$.subscribe(value => this.currentTrack = value);
    this.spotifyService.getAllPlaylists()
      .pipe(
        switchMap((playlistInfo: SpotifyPlaylistRespose) => {
          this.loading = true;
          this.playlistsLoaded = false;
          const tempList = [];
            const playlistsLength = playlistInfo.total;
            const owner = String(playlistInfo.next).split('users/')[1].split('/playlists')[0];
            const numberOfTimesToLoop = Math.ceil(playlistsLength / 50);
            for (let i = 0; i < numberOfTimesToLoop; i++) {
              const baseURI = `https://api.spotify.com/v1/users/${owner}/playlists?offset=${i * 50}&limit=50`;
              tempList.push(this.spotifyService.getAllPlaylists(baseURI));
            }
            return concat(...tempList);
        })
      )
      .subscribe((data: any) => {
        data.items.forEach((playlist: PlaylistData) => {
          if (playlist.name === this.selectedPlaylist) {
            playlist.selected = true;
          } else {
            playlist.selected = false;
          }
        });
        if (!data.next) {
          this.loading = false;
          this.playlistsLoaded = true;
        }
        this.playlists = this.playlists.concat(data.items);
      });

    this.playlistService.selectPlaylist$.subscribe((playlist: string) => {
      this.selectedPlaylist = playlist;
    });
  }

  goToTracks(playlist): void {
    this.playlists.forEach(tt => tt['selected'] = false);
    playlist['selected'] = true;
    // this.playlistService.savePlaylist(playlist);
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
