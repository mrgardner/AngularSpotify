import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  public links = [
    {
      path: 'library/albums',
      label: 'Albums'
    }
  ];

  public activeLink: any;

  constructor(private router: Router) { }

  ngOnInit() {
    // this.activeLink = this.links[0];
    // this.navigateTo(this.links[0].path);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
