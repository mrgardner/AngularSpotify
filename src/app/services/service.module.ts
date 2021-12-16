// Common
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { AuthService } from '@services/auth/auth.service';
import { ApolloService } from '@services/apollo/apollo.service';
import { DeviceModalService } from '@services/device-modal/device-modal.service';
import { PlaylistService } from '@services/playlist/playlist.service';
import { PlaylistDataSourceService } from '@services/playlist-data-source/playlist-data-source.service';
import { SpotifyService } from '@services/spotify/spotify.service';
import { SpotifyInterceptorService } from '@services/spotify-interceptor/spotify-interceptor.service';
import { SpotifyPlaybackService } from '@services/spotify-playback/spotify-playback.service';
import { StatusBarService } from '@services/status-bar/status-bar.service';
import { RouteService } from '@services/route/route.service';
import { TrackService } from '@services/track/track.service';
import { UtilService } from '@services/util/util.service';

@NgModule({
  providers: [
    AuthService,
    ApolloService,
    DeviceModalService,
    PlaylistService,
    PlaylistDataSourceService,
    SpotifyService,
    {
      provide: HTTP_INTERCEPTORS, useClass: SpotifyInterceptorService, multi: true
    },
    SpotifyPlaybackService,
    StatusBarService,
    RouteService,
    TrackService,
    UtilService
  ]
})
export class ServiceModule { }
