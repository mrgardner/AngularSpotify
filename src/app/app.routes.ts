import { RouterModule, Routes } from '@angular/router';
import {PlaylistTableComponent} from './components/tables/playlist-table/playlist-table.component';
import {HomeComponent} from './components/home/home.component';
import {CallbackComponent} from './components/callback/callback.component';
import {SpotifyGuard} from './guards/spotify/spotify.guard';
import {TrackComponent} from './components/track/track.component';
import {AlbumsComponent} from './components/collection/albums/albums.component';
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
  { path: 'home', component: HomeComponent, canActivate: [SpotifyGuard]},
  { path: 'playlist/:name/:id', component: PlaylistTableComponent, canActivate: [SpotifyGuard]},
  { path: 'callback', component: CallbackComponent},
  { path: 'login', component: LoginComponent},
  { path: 'track/:name/:id', component: TrackComponent, canActivate: [SpotifyGuard]},
  { path: 'collection', component: CollectionComponent, canActivate: [SpotifyGuard], children: [
    { path: 'playlists', component: PlaylistsComponent, canActivate: [SpotifyGuard]},
    { path: 'made-for-you', component: MadeForYouComponent, canActivate: [SpotifyGuard]},
    { path: 'liked-songs', component: LikedSongsComponent, canActivate: [SpotifyGuard]},
    { path: 'albums', component: AlbumsComponent, canActivate: [SpotifyGuard]},
    { path: 'artists', component: ArtistsComponent, canActivate: [SpotifyGuard]},
    { path: 'podcasts', component: PodcastsComponent, canActivate: [SpotifyGuard]}
  ]},
  { path: 'search', component: SearchComponent, canActivate: [SpotifyGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
