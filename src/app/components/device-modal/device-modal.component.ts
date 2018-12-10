import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {DeviceModalService} from '../../services/deviceModal/device-modal.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {MatDialogRef} from '@angular/material';
import { SpotifyToken } from 'src/app/interfaces/spotify-token/spotify-token.interface';
import { SpotifyDeviceResponse } from 'src/app/interfaces/device/spotify-device-response.interface';
import { SpotifyDevicesResponse } from 'src/app/interfaces/device/spotify-devices-response.interface';
import { Device } from 'src/app/interfaces/device/device.interface';

@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.scss']
})
export class DeviceModalComponent implements OnInit {
  public devices: Array<Device>;
  public currentDevice: string;
  public appDevice: string;

  constructor(
    private spotifyService: SpotifyService,
    private deviceModalService: DeviceModalService,
    private playlistService: PlaylistService,
    public dialogRef: MatDialogRef<DeviceModalComponent>) { }

  ngOnInit() {
    this.spotifyService.getAuthToken().pipe(
      switchMap((token: SpotifyToken) => {
        const authToken = !!token.token;
        if (authToken) {
          return this.spotifyService.getAvailableDevices(token.token);
        } else {
          return of();
        }
      }),
    ).subscribe((data: SpotifyDevicesResponse) => this.devices = data.devices);

    this.playlistService.getCurrentDevice().subscribe((device: string) => this.appDevice = device);
    this.spotifyService.getAuthToken().pipe(
      switchMap((token: SpotifyToken) => {
        const authToken = !!token.token;
        if (authToken) {
          return this.spotifyService.getCurrentPlayer(token.token);
        } else {
          return of();
        }
      }),
    ).subscribe((data: SpotifyDeviceResponse) => this.currentDevice = data.device.id);
  }

  hideModal(): void {
    this.dialogRef.close();
  }

  shortenString(string: string): string {
    const stringLength = 23;
    if (string.length > stringLength) {
      return string.substr(0, stringLength) + '...';
    } else {
      return string;
    }
  }

  makeDeviceActive(device: Device): void {
    this.spotifyService.getAuthToken().pipe(
      switchMap((token: SpotifyToken) => {
        const authToken = token.token;
        if (!!authToken) {
          return this.spotifyService.makeDeviceActive(authToken, device.id);
        } else {
          return of();
        }
      })
    ).subscribe(() => {
      this.currentDevice = device.id;
      this.deviceModalService.changeActiveDevice(device);
    });
  }
}
