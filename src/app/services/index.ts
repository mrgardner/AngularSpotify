import { ApolloService } from "./apollo/apollo.service";
import { SpotifyInterceptorService } from "./spotify-interceptor/spotify-interceptor.service";
import { SpotifyPlaybackService } from "./spotify-playback/spotify-playback.service";
import { SpotifyService } from "./spotify/spotify.service";
import { UtilService } from "./util/util.service";

export const appServices = [
  ApolloService,
  SpotifyService,
  SpotifyPlaybackService,
  UtilService
];

export const spotifyInterceptor = SpotifyInterceptorService;