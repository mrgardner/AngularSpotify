import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatusBarService } from '../../services/status-bar/status-bar.service';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { DeviceModalService } from '../../services/deviceModal/device-modal.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeviceModalComponent } from '../device-modal/device-modal.component';
import { SpotifyDeviceResponse } from '../../interfaces/device/device.interface';
import { Device } from '../../interfaces/device/device.interface';
import { SpotifyPlaybackService } from '../../services/spotify-playback/spotify-playback.service';
import { Track } from '../../interfaces/track/track.interface';
import { UtilService } from '../../services/util/util.service';
import { SpotifySongResponse } from '../../interfaces/song/song.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spotify-status-bar',
  templateUrl: './spotify-status-bar.component.html',
  styleUrls: ['./spotify-status-bar.component.scss']
})
export class SpotifyStatusBarComponent implements OnInit, OnDestroy {
  public currentTrack: Track;
  public volume: number;
  public currentDevice: Device;
  public currentDeviceId: string;
  public currentDeviceName: string;
  public appDevice: string;
  public songCurrentProgress: number;
  public showPlayButton: boolean;
  public isRepeatPlaylistShowing: boolean;
  public isRepeatTrackShowing: boolean;
  public isRepeatOffShowing: boolean;
  public state: SpotifySongResponse;
  public activeDeviceSubscription: Subscription;
  public currentPlayerSubscription: Subscription;
  public currentSongStateSubscription: Subscription;
  public showPlayButtonSubscription: Subscription;

  constructor(
    private spotifyService: SpotifyService,
    private deviceModalService: DeviceModalService,
    public dialog: MatDialog,
    private spotifyPlaybackService: SpotifyPlaybackService,
    public utilService: UtilService) {}

  ngOnInit(): void {
    this.isRepeatPlaylistShowing = false;
    this.isRepeatTrackShowing = false;
    this.isRepeatOffShowing = true;
    this.volume = 100;
    this.activeDeviceSubscription = this.deviceModalService.changeActiveDevice$.subscribe((device: Device) => {
      this.currentDeviceId = device.id;
      this.currentDeviceName = device.name;
      this.currentDevice = device;
      this.appDevice = localStorage.getItem('deviceId');
    });
    this.currentPlayerSubscription = this.spotifyService.getCurrentPlayer().subscribe((data: SpotifyDeviceResponse) => {
      if (data) {
        this.currentDevice = data.device;
        this.currentDeviceId = data.device.id;
        this.currentDeviceName = data.device.name;
        this.appDevice = localStorage.getItem('deviceId');
      }
    });

    this.currentSongStateSubscription = this.spotifyPlaybackService.currentSongState$.subscribe((newState: SpotifySongResponse) => {
      this.state = newState;
      this.songCurrentProgress = (Math.round(newState.position / 1000) / Math.round(newState.duration / 1000)) * 100;
      this.currentTrack = newState.track_window.current_track;
    });

    this.showPlayButtonSubscription = this.spotifyPlaybackService.showPlayButton$
      .subscribe((value: boolean) => this.showPlayButton = value);
  }

  ngOnDestroy(): void {
    this.activeDeviceSubscription.unsubscribe();
    this.currentPlayerSubscription.unsubscribe();
    this.currentSongStateSubscription.unsubscribe();
    this.showPlayButtonSubscription.unsubscribe();
  }

  openDeviceModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'device-modal-panel';
    dialogConfig.height = '350px';
    dialogConfig.width = '300px';
    this.dialog.open(DeviceModalComponent, dialogConfig);
  }

  onVolumeChange(event: Event): void {
    const volume: number = +(<HTMLInputElement>event.target).value;
    this.spotifyPlaybackService.setVolume(volume / 100);
  }

  playSong(): void {
    this.spotifyPlaybackService.playSong();
  }

  pauseSong(): void  {
    this.spotifyPlaybackService.pauseSong();
  }

  nextSong(): void {
    this.spotifyPlaybackService.nextSong();
  }

  previousSong(): void {
    this.spotifyPlaybackService.previousSong();
  }

  repeatPlaylist(): void {
    this.isRepeatOffShowing = false;
    this.isRepeatPlaylistShowing = true;
    this.isRepeatTrackShowing = false;
    this.spotifyService.setRepeatMode('context', localStorage.getItem('deviceId')).subscribe(() => {});
  }

  repeatTrack(): void {
    this.isRepeatOffShowing = false;
    this.isRepeatPlaylistShowing = false;
    this.isRepeatTrackShowing = true;
    this.spotifyService.setRepeatMode('track', localStorage.getItem('deviceId')).subscribe(() => {});
  }

  repeatOff(): void {
    this.isRepeatOffShowing = true;
    this.isRepeatPlaylistShowing = false;
    this.isRepeatTrackShowing = false;
    this.spotifyService.setRepeatMode('off', localStorage.getItem('deviceId')).subscribe(() => {});
  }
}
