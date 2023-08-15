import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showDeviceModal: boolean;

  constructor() {
    this.showDeviceModal = false;
  }
}