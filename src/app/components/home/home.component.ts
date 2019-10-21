import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(e => console.log(e));
    this.route.paramMap.subscribe(e => console.log(e));
  }
}
