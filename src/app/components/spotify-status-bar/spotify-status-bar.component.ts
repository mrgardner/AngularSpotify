import {Component, OnInit} from '@angular/core';
import {StatusBarService} from '../../services/status-bar/status-bar.service';
import {trigger, state, style, transition, animate} from '@angular/animations';
import parseMS from 'parse-ms';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {DeviceModalService} from '../../services/deviceModal/device-modal.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DeviceModalComponent} from '../device-modal/device-modal.component';
import { Artist } from 'src/app/interfaces/artist/artist.interface';
import { SpotifyDeviceResponse } from 'src/app/interfaces/device/spotify-device-response.interface';
import { Device } from 'src/app/interfaces/device/device.interface';
import { SpotifySongResponse } from 'src/app/interfaces/song/spotify-song-response.interface';
import { SpotifyPlaybackService } from 'src/app/services/spotify-playback/spotify-playback.service';
import { Track } from 'src/app/interfaces/track/track.interface';
import { PlaylistTableService } from 'src/app/services/playlist-table/playlist-table.service';

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
  public currentState: SpotifySongResponse;
  public isRepeatPlaylistShowing: boolean;
  public isRepeatTrackShowing: boolean;
  public isRepeatOffShowing: boolean;
  public isLoggedIn: boolean;
  public state: any;

  constructor(
    private statusBarService: StatusBarService,
    private playlistTableService: PlaylistTableService,
    private spotifyService: SpotifyService,
    private deviceModalService: DeviceModalService,
    private dialog: MatDialog,
    private spotifyPlaybackService: SpotifyPlaybackService) {}
  ngOnInit() {
    this.isRepeatPlaylistShowing = false;
    this.isRepeatTrackShowing = false;
    this.isRepeatOffShowing = true;
    this.imageEnlargeState = 'inactive';
    this.volume = 100;
    this.aString = '';
    this.isEnlargeIconShowing = false;
    this.statusBarService.enlargePicture$.subscribe((value: boolean) => this.imageEnlargeState = value ? 'active' : 'inactive');
    this.deviceModalService.changeActiveDevice$.subscribe((device: Device) => {
      this.currentDeviceId = device.id;
      this.currentDeviceName = device.name;
      this.currentDevice = device;
      this.appDevice = localStorage.getItem('deviceId');
    });
    this.spotifyService.getCurrentPlayer().subscribe((data: SpotifyDeviceResponse) => {
      if (data) {
        this.currentDevice = data.device;
        this.currentDeviceId = data.device.id;
        this.currentDeviceName = data.device.name;
        this.appDevice = localStorage.getItem('deviceId');
      }
    });

    this.spotifyPlaybackService.currentSongState$.subscribe(newState => {
      this.state = newState;
      this.songCurrentProgress = (Math.round(newState.position / 1000) / Math.round(newState.duration / 1000)) * 100;
      this.currentTrack = newState.track_window.current_track;
    });

    this.spotifyPlaybackService.showPlayButton$.subscribe(value => this.showPlayButton = value);
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
    this.spotifyService.getCurrentPlayer().pipe(
      switchMap((device: SpotifyDeviceResponse) => {
        if (device) {
          return this.spotifyService.changeSpotifyTrackVolume(device.device.id, event.target.value);
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
    this.isRepeatOffShowing = false;
    this.isRepeatPlaylistShowing = true;
    this.isRepeatTrackShowing = false;
    this.spotifyService.setRepeatMode('context', localStorage.getItem('deviceId')).subscribe(() => {});
  }

  repeatTrack() {
    this.isRepeatOffShowing = false;
    this.isRepeatPlaylistShowing = false;
    this.isRepeatTrackShowing = true;
    this.spotifyService.setRepeatMode('track', localStorage.getItem('deviceId')).subscribe(() => {});
  }

  repeatOff() {
    this.isRepeatOffShowing = true;
    this.isRepeatPlaylistShowing = false;
    this.isRepeatTrackShowing = false;
    this.spotifyService.setRepeatMode('off', localStorage.getItem('deviceId')).subscribe(() => {});
  }

  prettyMs(ms: number): string {
    const roundedSeconds = 1000 * Math.round(ms / 1000);
    const date = new Date(roundedSeconds);
    const seconds = date.getUTCSeconds() < 10 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds();
    return date.getUTCMinutes() + ':' + seconds;
  }
}
