import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app.routes';
import { PlaylistTableComponent } from './components/tables/playlist-table/playlist-table.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CallbackComponent } from './components/callback/callback.component';
import { DuplicateTrackPipe } from './pipes/duplicateTrack/duplicate-track.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TrackFilterComponent } from './components/track-filter/track-filter.component';
import { FilterTrackNamePipe } from './pipes/filterTrackName/filter-track-name.pipe';
import { FilterTrackArtistPipe } from './pipes/filterTrackArtist/filter-track-artist.pipe';
import { TrackComponent } from './components/track/track.component';
import { SpotifyNavigationMenuComponent } from './components/spotify-navigation-menu/spotify-navigation-menu.component';
import { SpotifyStatusBarComponent } from './components/spotify-status-bar/spotify-status-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DeviceModalComponent } from './components/device-modal/device-modal.component';
import { NewPlaylistDialogComponent } from './components/new-playlist-dialog/new-playlist-dialog.component';
import { AlbumsComponent } from './components/library/albums/albums.component';
import { FilterAlbumNamePipe } from './pipes/filterAlbumName/filter-album-name.pipe';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { SpotifyInterceptorService } from './services/spotify-interceptor/spotify-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { AngularMaterialModule } from './angular-material.module';
import { SpotifyApolloModule } from './services/apollo.module';
import { SpotifyStoreModule } from './reducers/store.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers/index';
import { NgrxCacheModule, NgrxCache } from 'apollo-angular-cache-ngrx';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  entryComponents: [
    NewPlaylistDialogComponent,
    DeviceModalComponent
  ],
  declarations: [
    AppComponent,
    PlaylistTableComponent,
    HeaderComponent,
    HomeComponent,
    CallbackComponent,
    DuplicateTrackPipe,
    TrackFilterComponent,
    FilterTrackNamePipe,
    FilterTrackArtistPipe,
    TrackComponent,
    SpotifyNavigationMenuComponent,
    SpotifyStatusBarComponent,
    DeviceModalComponent,
    NewPlaylistDialogComponent,
    AlbumsComponent,
    FilterAlbumNamePipe,
    DisplayUserComponent,
    LoginComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SpotifyApolloModule,
    StoreModule.forRoot(reducers),
    NgrxCacheModule.forRoot('myCustomApollo'),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: SpotifyInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngrxCache: NgrxCache) {
    const cache = ngrxCache.create({});
  }
}
