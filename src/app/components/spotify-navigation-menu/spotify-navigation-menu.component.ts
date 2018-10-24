import { Component } from '@angular/core';
import {switchMap} from 'rxjs/internal/operators';
import {of, concat} from 'rxjs';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {StatusBarService} from '../../services/status-bar/status-bar.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TrackService} from '../../services/track/track.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {NewPlaylistDialogComponent} from '../new-playlist-dialog/new-playlist-dialog.component';
import {Router} from "@angular/router";

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
export class SpotifyNavigationMenuComponent {
  public playlists: Array<Object> = [];
  public loading: boolean;
  public playlistsLoaded: boolean;
  private selectedPlaylist: string;
  public isPictureEnlarged: boolean;
  public currentTrack: Object;
  public imageEnlargeState: string;

  constructor(private spotifyService: SpotifyService, private playlistService: PlaylistService, private statusBarService: StatusBarService, private trackService: TrackService, private dialog: MatDialog, private router: Router) {
    let token = '';
    this.selectedPlaylist = '';
    this.imageEnlargeState = 'inactive';
    this.isPictureEnlarged = false;
    this.statusBarService.enlargePicture$.subscribe(value => {
      this.isPictureEnlarged = value;
      this.imageEnlargeState = value ? 'active' : 'inactive';
    });
    this.statusBarService.currenttrack$.subscribe(value => this.currentTrack = value['track']);
    this.trackService.getNowPlaying().subscribe(value => this.currentTrack = value['track_window']['current_track']);
    this.spotifyService.getAuthToken()
      .pipe(
        switchMap(spotifyToken => {
          token = spotifyToken['token'];
          const isLoggedIn = !!token;
          if (isLoggedIn) {
            return this.spotifyService.getAllPlaylists(token);
          } else {
            this.playlists = [];
            this.playlistsLoaded = false;
            return of();
          }
        }),
        switchMap(playlistInfo => {
          this.loading = true;
          this.playlistsLoaded = false;
          const isLoggedIn = !!token;
          const tempList = [];
          if (isLoggedIn) {
            const playlistsLength = playlistInfo['total'];
            const owner = String(playlistInfo['next']).split('users/')[1].split('/playlists')[0];
            const numberOfTimesToLoop = Math.ceil(playlistsLength / 50);
            for (let i = 0; i < numberOfTimesToLoop; i++) {
              const baseURI = `https://api.spotify.com/v1/users/${owner}/playlists?offset=${i * 50}&limit=50`;
              tempList.push(this.spotifyService.getAllPlaylists(token, baseURI));
            }
            return concat(...tempList);
          } else {
            this.loading = false;
            this.playlists = [];
            return of();
          }
        })
      )
      .subscribe(data => {
        if (data) {
          data['items'].forEach(playlist => {
            if (playlist['name'] === this.selectedPlaylist) {
              playlist['selected'] = true;
            } else {
              playlist['selected'] = false;
            }
          });
          if (!data['next']) {
            this.loading = false;
            this.playlistsLoaded = true;
          }
          this.playlists = this.playlists.concat(data['items']);
        }
      });

    this.playlistService.selectPlaylist$.subscribe(playlist => {
      this.selectedPlaylist = playlist;
    });
  }

  goToTracks(playlist) {
    this.playlists.forEach(tt => tt['selected'] = false);
    playlist['selected'] = true;
    this.playlistService.savePlaylist(playlist);
  }

  goToSavedAlbums() {
    this.router.navigate(['library/albums'])
  }

  shortenString(string) {
    const stringLength = 25;
    if (string.length > stringLength) {
      return string.substr(0, stringLength) + '...';
    } else {
      return string;
    }
  }

  shrinkPicture() {
    this.statusBarService.enlargePicture(false);
  }

  openNewPlaylistModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'new-playlist-panel';
    dialogConfig.height = '480px';
    dialogConfig.width = '800px';
    this.dialog.open(NewPlaylistDialogComponent, dialogConfig);
  }
}
