import { authServices } from '@auth/services';
import { bottomBarServices } from '@bottom-bar/services';
import { UtilService } from '@core/services/util/util.service';
import { ApolloService } from '@core/services/apollo/apollo.service';
import { RouteService } from '@core/services/route/route.service';
import { SpotifyService } from '@core/services/spotify/spotify.service';
import { SpotifyInterceptorService } from '@core/services/spotify-interceptor/spotify-interceptor.service';


export const coreServices: any[] = [
  ApolloService,
  ...authServices,
  ...bottomBarServices,
  RouteService,
  SpotifyService,
  UtilService
];

export const spotifyInterceptor = SpotifyInterceptorService;