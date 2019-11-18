import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { RouteService } from '../../services/route/route.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  public links = [
    {
      path: 'collection/playlists',
      label: 'Playlists',
      url: 'playlists'
    },
    {
      path: 'collection/made-for-you',
      label: 'Made For You',
      url: 'made-for-you'
    },
    {
      path: 'collection/liked-songs',
      label: 'Liked Songs',
      url: 'liked-songs'
    },
    {
      path: 'collection/albums',
      label: 'Albums',
      url: 'albums'
    },
    {
      path: 'collection/artists',
      label: 'Artists',
      url: 'artists'
    },
    {
      path: 'collection/podcasts',
      label: 'Podcasts',
      url: 'podcasts'
    }
  ];
  public selectedRoute: {
    parent: string,
    child: string
  };
  public activeLink: any;

  constructor(private router: Router, private routeService: RouteService) { }

  ngOnInit() {
    this.selectedRoute = this.routeService.parseUrl(this.router.url);
    if (this.selectedRoute.child) {
      for (let i = 0; i < this.links.length; i++) {
        if (this.links[i].url === this.selectedRoute.child) {
          this.activeLink = this.links[i];
          this.navigateTo(this.links[i].path);
        }
      }
    } else {
      this.activeLink = this.links[0];
      this.navigateTo(this.links[0].path);
    }
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event: NavigationStart) => {
      this.selectedRoute = this.routeService.parseUrl(event.url);
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
