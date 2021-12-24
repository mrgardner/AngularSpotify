// Common
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

// Interfaces
import { ActiveLink, Link, SelectedRoute } from '@core/interfaces/route/route.interface';

// Services
import { RouteService } from '@core/services/route/route.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {
  public links: Link[] = [
    {
      path: 'collections/playlists',
      label: 'Playlists',
      url: 'playlists'
    },
    {
      path: 'collections/made-for-you',
      label: 'Made For You',
      url: 'made-for-you'
    },
    {
      path: 'collections/liked-songs',
      label: 'Liked Songs',
      url: 'liked-songs'
    },
    {
      path: 'collections/albums',
      label: 'Albums',
      url: 'albums'
    },
    {
      path: 'collections/artists',
      label: 'Artists',
      url: 'artists'
    },
    {
      path: 'collections/podcasts',
      label: 'Podcasts',
      url: 'podcasts'
    }
  ];
  public selectedRoute: SelectedRoute;
  public activeLink: ActiveLink;
  public routerSubscription: Subscription;

  constructor(private router: Router, private routeService: RouteService) { }

  ngOnInit(): void {
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
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.selectedRoute = this.routeService.parseUrl(event.url);
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
