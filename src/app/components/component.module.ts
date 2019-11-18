import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { PlaylistTableComponent } from './tables/playlist-table/playlist-table.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { DuplicateTrackPipe } from '../pipes/duplicateTrack/duplicate-track.pipe';
import { TrackFilterComponent } from './track-filter/track-filter.component';
import { FilterTrackNamePipe } from '../pipes/filterTrackName/filter-track-name.pipe';
import { FilterTrackArtistPipe } from '../pipes/filterTrackArtist/filter-track-artist.pipe';
import { TrackComponent } from './track/track.component';
import { SpotifyNavigationMenuComponent } from './spotify-navigation-menu/spotify-navigation-menu.component';
import { SpotifyStatusBarComponent } from './spotify-status-bar/spotify-status-bar.component';
import { LoginComponent } from './login/login.component';
import { DeviceModalComponent } from './device-modal/device-modal.component';
import { NewPlaylistDialogComponent } from './new-playlist-dialog/new-playlist-dialog.component';
import { AlbumsComponent } from './collection/albums/albums.component';
import { FilterAlbumNamePipe } from '../pipes/filterAlbumName/filter-album-name.pipe';
import { DisplayUserComponent } from './display-user/display-user.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { AppRoutingModule } from '../app.routes';
import { CollectionComponent } from './collection/collection.component';
import { ArtistsComponent } from './collection/artists/artists.component';
import { PlaylistsComponent } from './collection/playlists/playlists.component';
import { MadeForYouComponent } from './collection/made-for-you/made-for-you.component';
import { LikedSongsComponent } from './collection/liked-songs/liked-songs.component';
import { PodcastsComponent } from './collection/podcasts/podcasts.component';

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
    LoginComponent,
    CollectionComponent,
    ArtistsComponent,
    PlaylistsComponent,
    MadeForYouComponent,
    LikedSongsComponent,
    PodcastsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AppRoutingModule
  ]
})
export class ComponentModule {}
