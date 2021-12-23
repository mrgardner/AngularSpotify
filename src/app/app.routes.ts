// Common
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AlbumsComponent } from '@components/collection/albums/albums.component';
import { ArtistsComponent } from '@components/collection/artists/artists.component';
import { CallbackComponent } from '@components/callback/callback.component';
import { CollectionComponent } from '@components/collection/collection.component';
import { HomeComponent } from '@components/home/home.component';
import { LoginComponent } from '@components/login/login.component';
import { LikedSongsComponent } from '@components/collection/liked-songs/liked-songs.component';
import { MadeForYouComponent } from '@components/collection/made-for-you/made-for-you.component';
import { PlaylistsComponent } from '@components/collection/playlists/playlists.component';
import { PlaylistTableComponent } from '@components/playlist-table/playlist-table.component';
import { PodcastsComponent } from '@components/collection/podcasts/podcasts.component';
import { SearchComponent } from '@components/search/search.component';
import { TrackComponent } from '@components/track/track.component';

// Guards
import { AuthGuard } from '@guards/auth/auth.guard';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'collection', component: CollectionComponent, canActivate: [AuthGuard], children: [
      { path: 'playlists', component: PlaylistsComponent, canActivate: [AuthGuard] },
      { path: 'made-for-you', component: MadeForYouComponent, canActivate: [AuthGuard] },
      { path: 'liked-songs', component: LikedSongsComponent, canActivate: [AuthGuard] },
      { path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard] },
      { path: 'artists', component: ArtistsComponent, canActivate: [AuthGuard] },
      { path: 'podcasts', component: PodcastsComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'playlist/:name/:id', component: PlaylistTableComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'track/:name/:id', component: TrackComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
