import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  constructor(private router: Router) {}

  // TODO: Finish logic for parsing the URL
  parseUrl(route: string) {
    console.log(route);
    console.log(this.router.config);
    const splitRoute = route.split('/').filter(function (el) {
      return el !== '';
    })[0];
    const selectedRoute = '';
    console.log(splitRoute);
  }
}
