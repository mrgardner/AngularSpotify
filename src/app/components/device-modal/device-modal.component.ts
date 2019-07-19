import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { DeviceModalService } from '../../services/deviceModal/device-modal.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SpotifyDeviceResponse } from '../../interfaces/device/spotify-device-response.interface';
import { SpotifyDevicesResponse } from '../../interfaces/device/spotify-devices-response.interface';
import { Device } from '../../interfaces/device/device.interface';
import { UtilService } from '../../services/util/util.service';

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
    public dialogRef: MatDialogRef<DeviceModalComponent>,
    public utilService: UtilService) { }

  ngOnInit() {
    this.spotifyService.getAvailableDevices().subscribe((data: SpotifyDevicesResponse) => this.devices = data.devices);
    this.spotifyService.getCurrentPlayer().subscribe((data: SpotifyDeviceResponse) => this.currentDevice = data.device.id);
  }

  hideModal(): void {
    this.dialogRef.close();
  }

  makeDeviceActive(device: Device): void {
    this.spotifyService.makeDeviceActive(device.id).subscribe(() => {
      this.currentDevice = device.id;
      this.deviceModalService.changeActiveDevice(device);
    });
  }
}
