import { RouterModule, Routes } from '@angular/router';
import {PlaylistTableComponent} from './components/tables/playlist-table/playlist-table.component';
import {HomeComponent} from './components/home/home.component';
import {CallbackComponent} from './components/callback/callback.component';
import {SpotifyGuard} from './guards/spotify/spotify.guard';
import {TrackComponent} from './components/track/track.component';
import {AlbumsComponent} from './components/library/albums/albums.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { LibraryComponent } from './components/library/library.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [SpotifyGuard], data: {route: 'home'}},
  { path: 'playlist/:name/:id', component: PlaylistTableComponent, canActivate: [SpotifyGuard], data: {route: 'playlist'}},
  { path: 'callback', component: CallbackComponent, data: {route: 'callback'}},
  { path: 'login', component: LoginComponent, data: {route: 'login'}},
  { path: 'track/:name/:id', component: TrackComponent, canActivate: [SpotifyGuard], data: {route: 'track'}},
  { path: 'library', component: LibraryComponent, canActivate: [SpotifyGuard], data: {route: 'library'}},
  { path: 'library/albums', component: AlbumsComponent, canActivate: [SpotifyGuard], data: {route: 'albums'}}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
