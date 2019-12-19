import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpotifyInterceptorService } from './spotify-interceptor/spotify-interceptor.service';
import { AuthService } from './auth/auth.service';
import { ApolloService } from './apollo/apollo.service';
import { DeviceModalService } from './deviceModal/device-modal.service';
import { PlaylistService } from './playlist/playlist.service';
import { PlaylistDataSourceService } from './playlist-data-source/playlist-data-source.service';
import { RouteService } from './route/route.service';
import { SpotifyService } from './spotify/spotify.service';
import { SpotifyPlaybackService } from './spotify-playback/spotify-playback.service';
import { StatusBarService } from './status-bar/status-bar.service';
import { TrackService } from './track/track.service';
import { UtilService } from './util/util.service';

@NgModule({
  providers: [
    ApolloService,
    AuthService,
    DeviceModalService,
    PlaylistService,
    PlaylistDataSourceService,
    RouteService,
    SpotifyService,
    SpotifyPlaybackService,
    StatusBarService,
    TrackService,
    UtilService,
    {
      provide: HTTP_INTERCEPTORS, useClass: SpotifyInterceptorService, multi: true
    }
  ]
})
export class ServiceModule {}
