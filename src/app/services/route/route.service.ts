import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  constructor() {}

  // TODO: Fix return type
  parseUrl(route: string) {
    const splitRoute = route.split('/').filter(function (el) {
      return el !== '';
    });
    const selectedRoute = {
      parent: null,
      child: null,
      id: null
    };
    for (let i = 0; i < splitRoute.length; i++) {
      if (i === 0) {
        selectedRoute.parent = splitRoute[0].replace(/%20/g, ' ');
      }
      if (i === 1) {
        selectedRoute.child = splitRoute[1].replace(/%20/g, ' ');
      }
      if (i === 2) {
        selectedRoute.id = splitRoute[2].replace(/%20/g, ' ');
      }
    }
    return selectedRoute;
  }
}
