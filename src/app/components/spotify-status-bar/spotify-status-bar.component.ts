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
import { CurrentTrack } from 'src/app/interfaces/track/current-track.interface';
import { Track } from 'src/app/interfaces/track/track.interface';

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
  public currentTrack: Track;
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
  public showPlayButton: boolean;
  public showPauseButton: boolean;
  public currentState: SpotifySongResponse;
  private currentTrackPosition: number;
  public isRepeatPlaylistShowing: boolean;
  public isRepeatTrackShowing: boolean;
  public isRepeatOffShowing: boolean;

  constructor(
    private statusBarService: StatusBarService,
    private playlistService: PlaylistService,
    private trackService: TrackService,
    private spotifyService: SpotifyService,
    private deviceModalService: DeviceModalService,
    private dialog: MatDialog,
    private spotifyPlaybackService: SpotifyPlaybackService) {}
  ngOnInit() {
    this.showPlayButton = true;
    this.showPauseButton = false;
    this.isRepeatPlaylistShowing = false;
    this.isRepeatTrackShowing = false;
    this.isRepeatOffShowing = true;
    this.imageEnlargeState = 'inactive';
    this.volume = 100;
    this.aString = '';
    this.timer = null;
    this.isEnlargeIconShowing = false;
    this.statusBarService.enlargePicture$.subscribe((value: boolean) => this.imageEnlargeState = value ? 'active' : 'inactive');
    this.spotifyPlaybackService.test2$.subscribe(() => window.clearInterval(this.timer));
    this.spotifyPlaybackService.currentSongState$.subscribe(song => {
      window.clearInterval(this.timer);
      this.timer = null;

      this.currentTrackMinutes = this.getMinutes(song['position']);
      this.currentTrackSeconds = this.getSeconds(song['position']);
      this.trackDurationMinutes = this.getMinutes(song['duration']);
      this.trackDurationSeconds = this.getSeconds(song['duration']);

      this.songProgression = (this.currentTrackMinutes * 60) + (this.currentTrackSeconds);
      this.songTotalDuration = (this.trackDurationMinutes * 60) + (this.trackDurationSeconds);
      const totalMinutes = this.getMinutes(song['duration']);
      const totalSeconds = this.getSeconds(song['duration']);
      this.songCurrentProgress = (this.songProgression / this.songTotalDuration) * 100;
      this.currentTrack = song['track_window']['current_track'];
      this.currentState = song;

      if (song['paused'] === false) {
        this.showPlayButton = false;
        this.showPauseButton = true;
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
        this.showPlayButton = true;
        this.showPauseButton = false;
      }
    });
    this.deviceModalService.changeActiveDevice$.subscribe((device: Device) => {
      this.currentDeviceId = device.id;
      this.currentDeviceName = device.name;
      this.currentDevice = device;
    });
    this.playlistService.getCurrentDevice().subscribe((data: string) => this.appDevice = data);
    this.spotifyPlaybackService.currentTrackPosition$.subscribe((position: number) => this.currentTrackPosition = position);
    this.spotifyService.getAuthToken().pipe(
      switchMap((spotifyToken: SpotifyToken) => {
        const authToken = !!spotifyToken.token;
        if (authToken) {
          return this.spotifyService.getCurrentPlayer(spotifyToken.token);
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

  shortenString(string: string): string {
    const stringLength = 15;
    if (string.length > stringLength) {
      return string.substr(0, stringLength) + '...';
    } else {
      return string;
    }
  }

  displayArtists(artists: Array<Artist>): Array<string> {
    if (artists) {
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

  playSong() {
    this.spotifyPlaybackService.playSong();
  }

  pauseSong() {
    this.spotifyPlaybackService.pauseSong();
  }

  nextSong() {
    this.spotifyPlaybackService.nextSong();
  }

  previousSong() {
    this.spotifyPlaybackService.previousSong();
  }

  repeatPlaylist() {
    let token = '';
    this.isRepeatOffShowing = false;
    this.isRepeatPlaylistShowing = true;
    this.isRepeatTrackShowing = false;
    this.spotifyService.getAuthToken().pipe(
      switchMap((spotifyToken: SpotifyToken) => {
        token = spotifyToken.token;
        if (token) {
          return this.playlistService.getCurrentDevice();
        } else {
          return of();
        }
      }),
      switchMap((deviceID: string) => {
        if (deviceID) {
          return this.spotifyService.setRepeatMode(token, 'context', deviceID);
        } else {
          return of();
        }
      })).subscribe(() => {});
  }

  repeatTrack() {
    let token = '';
    this.isRepeatOffShowing = false;
    this.isRepeatPlaylistShowing = false;
    this.isRepeatTrackShowing = true;
    this.spotifyService.getAuthToken().pipe(
      switchMap((spotifyToken: SpotifyToken) => {
        token = spotifyToken.token;
        if (token) {
          return this.playlistService.getCurrentDevice();
        } else {
          return of();
        }
      }),
      switchMap((deviceID: string) => {
        if (deviceID) {
          return this.spotifyService.setRepeatMode(token, 'track', deviceID);
        } else {
          return of();
        }
      })).subscribe(() => {});
  }

  repeatOff() {
    let token = '';
    this.isRepeatOffShowing = true;
    this.isRepeatPlaylistShowing = false;
    this.isRepeatTrackShowing = false;
    this.spotifyService.getAuthToken().pipe(
      switchMap((spotifyToken: SpotifyToken) => {
        token = spotifyToken.token;
        if (token) {
          return this.playlistService.getCurrentDevice();
        } else {
          return of();
        }
      }),
      switchMap((deviceID: string) => {
        if (deviceID) {
          return this.spotifyService.setRepeatMode(token, 'off', deviceID);
        } else {
          return of();
        }
      })).subscribe(() => {});
  }
}
