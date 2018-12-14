import {Component, OnInit} from '@angular/core';
import {StatusBarService} from '../../services/status-bar/status-bar.service';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {TrackService} from '../../services/track/track.service';
import parseMS from 'parse-ms';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {DeviceModalService} from '../../services/deviceModal/device-modal.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DeviceModalComponent} from '../device-modal/device-modal.component';
import {PlaylistService} from '../../services/playlist/playlist.service';
import { Artist } from 'src/app/interfaces/artist/artist.interface';
import { SpotifyDeviceResponse } from 'src/app/interfaces/device/spotify-device-response.interface';
import { SpotifyToken } from 'src/app/interfaces/spotify-token/spotify-token.interface';
import { Device } from 'src/app/interfaces/device/device.interface';
import { SpotifySongResponse } from 'src/app/interfaces/song/spotify-song-response.interface';
import { SpotifyPlaybackService } from 'src/app/services/spotify-playback/spotify-playback.service';

@Component({
  selector: 'app-spotify-status-bar',
  templateUrl: './spotify-status-bar.component.html',
  styleUrls: ['./spotify-status-bar.component.scss'],
  animations: [
    trigger('trackAlbumImage', [
      state('active', style({
        transform: 'translateX(-100px)'
      })),
      state('inactive', style({
        transform: 'translateX(0)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class SpotifyStatusBarComponent implements OnInit {
  public currentTrack: Object;
  public imageEnlargeState: string;
  public isEnlargeIconShowing: boolean;
  public currentTrackMinutes: number;
  public currentTrackSeconds: number;
  public trackDurationMinutes: number;
  public trackDurationSeconds: number;
  public aString: string;
  public volume: number;
  public currentDevice: Object;
  public currentDeviceId: string;
  public currentDeviceName: string;
  public appDevice: string;
  private timer: any;
  public songProgression: number;
  public songTotalDuration: number;
  public songCurrentProgress: number;

  constructor(
    private statusBarService: StatusBarService,
    private playlistService: PlaylistService,
    private trackService: TrackService,
    private spotifyService: SpotifyService,
    private deviceModalService: DeviceModalService,
    private dialog: MatDialog,
    private spotifyPlaybackService: SpotifyPlaybackService) {}
  ngOnInit() {
    this.imageEnlargeState = 'inactive';
    this.volume = 100;
    this.aString = '';
    this.timer = null;
    this.isEnlargeIconShowing = false;
    this.statusBarService.enlargePicture$.subscribe((value: boolean) => this.imageEnlargeState = value ? 'active' : 'inactive');
    this.spotifyPlaybackService.currentSongState$.subscribe(song => {
      this.currentTrackMinutes = this.getMinutes(song['position']);
      this.currentTrackSeconds = this.getSeconds(song['position']);
      this.trackDurationMinutes = this.getMinutes(song['duration']);
      this.trackDurationSeconds = this.getSeconds(song['duration']);

      this.songProgression = (this.currentTrackMinutes * 60) + (this.currentTrackSeconds);
      this.songTotalDuration = (this.trackDurationMinutes * 60) + (this.trackDurationSeconds);
      const totalMinutes = this.getMinutes(song['duration']);
      const totalSeconds = this.getSeconds(song['duration']);

      if (song['paused'] === false) {
        this.currentTrack = song['track_window']['current_track'];
        this.statusBarService.setCurrentTrack(this.currentTrack);
        this.timer = window.setInterval(() => {
          this.currentTrackSeconds += 1;
          this.songProgression += 1;
          this.songCurrentProgress = (this.songProgression / this.songTotalDuration) * 100;
          if (this.currentTrackSeconds === 60) {
            this.currentTrackMinutes += 1;
            this.currentTrackSeconds = 0;
          }

          if (this.currentTrackSeconds >= totalSeconds && this.currentTrackMinutes >= totalMinutes) {
            window.clearInterval(this.timer);
          }
        }, 1000);
      } else {
        window.clearInterval(this.timer);
      }
    });
    this.deviceModalService.changeActiveDevice$.subscribe((device: Device) => {
      this.currentDeviceId = device.id;
      this.currentDeviceName = device.name;
      this.currentDevice = device;
    });
    this.playlistService.getCurrentDevice().subscribe((data: string) => this.appDevice = data);
    this.spotifyService.getAuthToken().pipe(
      switchMap((token: SpotifyToken) => {
        const authToken = !!token.token;
        if (authToken) {
          return this.spotifyService.getCurrentPlayer(token.token);
        } else {
          return of();
        }
      }),
    ).subscribe((data: SpotifyDeviceResponse) => {
      if (data) {
        this.currentDevice = data.device;
        this.currentDeviceId = data.device.id;
        this.currentDeviceName = data.device.name;
      }
    });
  }

  displayArtists(artists: Array<Artist>): Array<string> {
    const numberOfArtists = artists.length;
    return artists.map((artist, i) => {
      let artistString = '';
      if (numberOfArtists > 1) {
        if (numberOfArtists - 1 === i) {
          artistString += artist.name;
        } else {
          artistString += `${artist.name}, `;
        }
      }  else {
        artistString = artist.name;
      }
      return artistString;
    });
  }

  enlargePicture(): void {
    this.statusBarService.enlargePicture$.emit(true);
  }

  showEnlargeIcon(): void {
    this.isEnlargeIconShowing = true;
  }

  hideEnlargeIcon(): void {
    this.isEnlargeIconShowing = false;
  }

  getMinutes(ms) {
    const time = parseMS(ms);
    return (time.days * (60 * 24)) + (time.hours * 60) + (time.minutes);
  }

  getSeconds(ms) {
    const time = parseMS(ms);
    return time.seconds;
  }

  onVolumeChange(event): void {
    let spotifyToken = '';
    this.spotifyService.getAuthToken().pipe(
      switchMap((token: SpotifyToken) => {
        const authToken = !!token.token;
        spotifyToken = token.token;
        if (authToken) {
          return this.spotifyService.getCurrentPlayer(token.token);
        } else {
          return of();
        }
      }),
      switchMap((device: SpotifyDeviceResponse) => {
        if (device) {
          return this.spotifyService.changeSpotifyTrackVolume(spotifyToken, device.device.id, event.target.value);
        } else {
          return of();
        }
      })
    ).subscribe(() => {});
  }

  openDeviceModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'device-modal-panel';
    dialogConfig.height = '350px';
    dialogConfig.width = '300px';
    this.dialog.open(DeviceModalComponent, dialogConfig);
  }
}
