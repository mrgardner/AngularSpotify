// Angular Material
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

// Common
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Interfaces
import { Device, SpotifyDeviceResponse, SpotifyDevicesResponse } from '@interfaces/device/device.interface';

// Services
import { DeviceModalService } from '@services/device-modal/device-modal.service';
import { SpotifyService } from '@services/spotify/spotify.service';
import { UtilService } from '@services/util/util.service';

@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.scss']
})
export class DeviceModalComponent implements OnInit, OnDestroy {
  public devices: Device[];
  public currentDevice: string;
  public appDevice: string;
  public availableDevicesSubscription: Subscription;
  public playerSubscription: Subscription;

  constructor(
    private spotifyService: SpotifyService,
    private deviceModalService: DeviceModalService,
    public dialogRef: MatDialogRef<DeviceModalComponent>,
    public utilService: UtilService) { }

  ngOnInit(): void {
    this.availableDevicesSubscription = this.spotifyService.getAvailableDevices()
      .subscribe((data: SpotifyDevicesResponse) => this.devices = data.devices);
    this.playerSubscription = this.spotifyService.getCurrentPlayer()
      .subscribe((data: SpotifyDeviceResponse) => this.currentDevice = data.device.id);
  }

  ngOnDestroy(): void {
    this.availableDevicesSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
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
