import { Injectable } from '@angular/core';
import { SelectedRoute } from '@app/interfaces/route/route.interface';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  parseUrl(route: string): SelectedRoute {
    const splitRoute = route.split('/').filter(function (el) {
      return el !== '';
    });
    const selectedRoute = {
      parent: "",
      child: "",
      id: ""
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