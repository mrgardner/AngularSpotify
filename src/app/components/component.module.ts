// Common
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// App-Core
import { AngularMaterialModule } from '@app-core/angular-material.module';
import { AppRoutingModule } from '@app-core/app.routes';

// components
import { AlbumsComponent } from '@components/collection/albums/albums.component';
import { AppComponent } from '@components/app/app.component';
import { ArtistsComponent } from '@components/collection/artists/artists.component';
import { CallbackComponent } from '@components/callback/callback.component';
import { CollectionComponent } from '@components/collection/collection.component';
import { DeviceModalComponent } from '@components/device-modal/device-modal.component';
import { DisplayUserComponent } from '@components/display-user/display-user.component';
import { HeaderComponent } from '@components/header/header.component';
import { HighlightSearchComponent } from '@components/highlight-search/highlight-search.component';
import { HomeComponent } from '@components/home/home.component';
import { LikedSongsComponent } from '@components/collection/liked-songs/liked-songs.component';
import { LoginComponent } from '@components/login/login.component';
import { MadeForYouComponent } from '@components/collection/made-for-you/made-for-you.component';
import { NewPlaylistDialogComponent } from '@components/new-playlist-dialog/new-playlist-dialog.component';
import { PlaylistsComponent } from '@components/collection/playlists/playlists.component';
import { PlaylistTableComponent } from '@components/playlist-table/playlist-table.component';
import { PodcastsComponent } from '@components/collection/podcasts/podcasts.component';
import { SearchComponent } from '@components/search/search.component';
import { SpotifyNavigationMenuComponent } from '@components/spotify-navigation-menu/spotify-navigation-menu.component';
import { SpotifyStatusBarComponent } from '@components/spotify-status-bar/spotify-status-bar.component';
import { TrackComponent } from '@components/track/track.component';
import { TrackFilterComponent } from '@components/track-filter/track-filter.component';

// Pipes
import { FilterAlbumNamePipe } from '@pipes/filter-album-name/filter-album-name.pipe';
import { DuplicateTrackPipe } from '@pipes/duplicate-track/duplicate-track.pipe';

@NgModule({
    declarations: [
        AlbumsComponent,
        AppComponent,
        ArtistsComponent,
        CallbackComponent,
        CollectionComponent,
        DeviceModalComponent,
        DisplayUserComponent,
        DuplicateTrackPipe,
        FilterAlbumNamePipe,
        HeaderComponent,
        HighlightSearchComponent,
        HomeComponent,
        LikedSongsComponent,
        LoginComponent,
        MadeForYouComponent,
        NewPlaylistDialogComponent,
        PlaylistsComponent,
        PlaylistTableComponent,
        PodcastsComponent,
        SearchComponent,
        SpotifyNavigationMenuComponent,
        SpotifyStatusBarComponent,
        TrackComponent,
        TrackFilterComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ComponentModule { }
