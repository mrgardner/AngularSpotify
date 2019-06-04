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
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NewPlaylistDialogComponent } from './components/new-playlist-dialog/new-playlist-dialog.component';
import { AlbumsComponent } from './components/library/albums/albums.component';
import { FilterAlbumNamePipe } from './pipes/filterAlbumName/filter-album-name.pipe';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { SpotifyInterceptorService } from './services/spotify-interceptor/spotify-interceptor.service';
import { MatToolbarModule, MatMenuModule, MatSidenavModule, MatListModule, MatPaginatorModule } from '@angular/material';

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
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: SpotifyInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
