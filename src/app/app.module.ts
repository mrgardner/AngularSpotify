import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app/app.component';
import { routing } from './app.routes';
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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TrackFilterComponent } from './components/track-filter/track-filter.component';
import { FilterTrackNamePipe } from './pipes/filterTrackName/filter-track-name.pipe';
import { FilterTrackArtistPipe } from './pipes/filterTrackArtist/filter-track-artist.pipe';
import { TrackComponent } from './components/track/track.component';
import { SpotifyNavigationMenuComponent } from './components/spotify-navigation-menu/spotify-navigation-menu.component';
import { SpotifyStatusBarComponent } from './components/spotify-status-bar/spotify-status-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DeviceModalComponent } from './components/device-modal/device-modal.component';
import {MatButtonModule, MatDialogModule, MatProgressBarModule} from '@angular/material';
import { NewPlaylistDialogComponent } from './components/new-playlist-dialog/new-playlist-dialog.component';
import { AlbumsComponent } from './components/library/albums/albums.component';
import { FilterAlbumNamePipe } from './pipes/filterAlbumName/filter-album-name.pipe';


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
    LoginComponent,
    RegisterComponent,
    TrackFilterComponent,
    FilterTrackNamePipe,
    FilterTrackArtistPipe,
    TrackComponent,
    SpotifyNavigationMenuComponent,
    SpotifyStatusBarComponent,
    DeviceModalComponent,
    NewPlaylistDialogComponent,
    AlbumsComponent,
    FilterAlbumNamePipe
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
