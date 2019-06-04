import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app.routes';
import { PlaylistTableComponent } from './components/tables/playlist-table/playlist-table.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
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
import {
  MatButtonModule,
  MatDialogModule,
  MatProgressBarModule,
  MatIconModule,
  MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatPaginatorModule
} from '@angular/material';
import { NewPlaylistDialogComponent } from './components/new-playlist-dialog/new-playlist-dialog.component';
import { AlbumsComponent } from './components/library/albums/albums.component';
import { FilterAlbumNamePipe } from './pipes/filterAlbumName/filter-album-name.pipe';
import { CookieService } from 'ngx-cookie-service';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { SpotifyInterceptorService } from './services/spotify-interceptor/spotify-interceptor.service';

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
    DisplayUserComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS, useClass: SpotifyInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
