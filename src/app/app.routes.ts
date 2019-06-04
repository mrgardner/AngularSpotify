import { RouterModule, Routes } from '@angular/router';
import {PlaylistTableComponent} from './components/tables/playlist-table/playlist-table.component';
import {HomeComponent} from './components/home/home.component';
import {CallbackComponent} from './components/callback/callback.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SpotifyGuard} from './guards/spotify/spotify.guard';
import {TrackComponent} from './components/track/track.component';
import {AlbumsComponent} from './components/library/albums/albums.component';
import { NgModule } from '@angular/core';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [SpotifyGuard]},
  { path: 'playlist/:name/:id', component: PlaylistTableComponent, canActivate: [SpotifyGuard]},
  { path: 'callback', component: CallbackComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'track/:name/:id', component: TrackComponent, canActivate: [SpotifyGuard]},
  { path: 'library/albums', component: AlbumsComponent, canActivate: [SpotifyGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
