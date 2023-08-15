import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  // TODO: FIX / REFACTOR
  // public links: Link[] = [
  //   {
  //     path: 'dashboard/collections/playlists',
  //     label: 'Playlists',
  //     url: 'playlists'
  //   },
  //   {
  //     path: 'dashboard/collections/made-for-you',
  //     label: 'Made For You',
  //     url: 'made-for-you'
  //   },
  //   {
  //     path: 'dashboard/collections/liked-songs',
  //     label: 'Liked Songs',
  //     url: 'liked-songs'
  //   },
  //   {
  //     path: 'dashboard/collections/albums',
  //     label: 'Albums',
  //     url: 'albums'
  //   },
  //   {
  //     path: 'dashboard/collections/artists',
  //     label: 'Artists',
  //     url: 'artists'
  //   },
  //   {
  //     path: 'dashboard/collections/podcasts',
  //     label: 'Podcasts',
  //     url: 'podcasts'
  //   }
  // ];
  // public selectedRoute: SelectedRoute;
  // public activeLink: ActiveLink;
  // public routerSubscription: Subscription;

  constructor(private router: Router) { }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}