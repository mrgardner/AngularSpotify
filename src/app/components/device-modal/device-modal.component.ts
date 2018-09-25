import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {DeviceModalService} from '../../services/deviceModal/device-modal.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.scss']
})
export class DeviceModalComponent implements OnInit {
  public devices: Array<Object>;
  public currentDevice: string;
  public appDevice: string;

  constructor(private spotifyService: SpotifyService, private deviceModalService: DeviceModalService, private playlistService: PlaylistService, public dialogRef: MatDialogRef<DeviceModalComponent>) { }

  ngOnInit() {
    this.spotifyService.getAuthToken().pipe(
      switchMap(token => {
        const authToken = !!token['token'];
        if (authToken) {
          return this.spotifyService.getAvailableDevices(token['token']);
        } else {
          return of();
        }
      }),
    ).subscribe(data => this.devices = data['devices']);

    this.playlistService.getCurrentDevice().subscribe(data => this.appDevice = data);
    this.spotifyService.getAuthToken().pipe(
      switchMap(token => {
        const authToken = !!token['token'];
        if (authToken) {
          return this.spotifyService.getCurrentPlayer(token['token']);
        } else {
          return of();
        }
      }),
    ).subscribe(data => this.currentDevice = data['device']['id']);
  }

  hideModal() {
    this.dialogRef.close();
  }

  shortenString(string) {
    const stringLength = 23;
    if (string.length > stringLength) {
      return string.substr(0, stringLength) + '...';
    } else {
      return string;
    }
  }

  makeDeviceActive(device: Object) {
    let authToken = '';
    this.spotifyService.getAuthToken().pipe(
      switchMap(token => {
        authToken = token['token'];
        if (!!authToken) {
          return this.spotifyService.makeDeviceActive(authToken, device['id']);
        } else {
          return of();
        }

      })
    ).subscribe(() => {
      this.currentDevice = device['id'];
      this.deviceModalService.changeActiveDevice(device);
    });
  }
}
