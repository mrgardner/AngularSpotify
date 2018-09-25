import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private location: Location) {
    this.location.subscribe(data => {
      if (data.url.indexOf('callback') !== -1) {
        this.location.go('/');
      }
    });
  }

  goBack() {
    this.location.back();
  }

  goForward() {
    this.location.forward();
  }
}
