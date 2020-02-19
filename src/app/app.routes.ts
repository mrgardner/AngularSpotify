import { RouterModule, Routes } from '@angular/router';
import { PlaylistTableComponent } from './components/playlist-table/playlist-table.component';
import { HomeComponent } from './components/home/home.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { TrackComponent } from './components/track/track.component';
import { AlbumsComponent } from './components/collection/albums/albums.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { CollectionComponent } from './components/collection/collection.component';
import { ArtistsComponent } from './components/collection/artists/artists.component';
import { MadeForYouComponent } from './components/collection/made-for-you/made-for-you.component';
import { LikedSongsComponent } from './components/collection/liked-songs/liked-songs.component';
import { PodcastsComponent } from './components/collection/podcasts/podcasts.component';
import { PlaylistsComponent } from './components/collection/playlists/playlists.component';
import { SearchComponent } from './components/search/search.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'playlist/:name/:id', component: PlaylistTableComponent, canActivate: [AuthGuard]},
  { path: 'callback', component: CallbackComponent},
  { path: 'login', component: LoginComponent},
  { path: 'track/:name/:id', component: TrackComponent, canActivate: [AuthGuard]},
  { path: 'collection', component: CollectionComponent, canActivate: [AuthGuard], children: [
    { path: 'playlists', component: PlaylistsComponent, canActivate: [AuthGuard]},
    { path: 'made-for-you', component: MadeForYouComponent, canActivate: [AuthGuard]},
    { path: 'liked-songs', component: LikedSongsComponent, canActivate: [AuthGuard]},
    { path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard]},
    { path: 'artists', component: ArtistsComponent, canActivate: [AuthGuard]},
    { path: 'podcasts', component: PodcastsComponent, canActivate: [AuthGuard]}
  ]},
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
