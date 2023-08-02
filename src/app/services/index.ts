import { ApolloService } from "./apollo/apollo.service";
import { AuthService } from "./auth/auth.service";
import { RouteService } from "./route/route.service";
import { SpotifyInterceptorService } from "./spotify-interceptor/spotify-interceptor.service";
import { SpotifyPlaybackService } from "./spotify-playback/spotify-playback.service";
import { SpotifyService } from "./spotify/spotify.service";
import { UtilService } from "./util/util.service";

export const appServices: any[] = [
  ApolloService,
  AuthService,
  RouteService,
  SpotifyService,
  SpotifyPlaybackService,
  UtilService
];

export const spotifyInterceptor = SpotifyInterceptorService;