import { RouterModule, Routes } from '@angular/router';
import {PlaylistTableComponent} from './components/tables/playlist-table/playlist-table.component';
import {HomeComponent} from './components/home/home.component';
import {CallbackComponent} from './components/callback/callback.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard} from './guards/auth/auth.guard';
import {SpotifyGuard} from './guards/spotify/spotify.guard';
import {TrackComponent} from './components/track/track.component';
import {AlbumsComponent} from './components/library/albums/albums.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard, SpotifyGuard]},
  { path: 'playlist/:playlistID', component: PlaylistTableComponent, canActivate: [AuthGuard, SpotifyGuard]},
  { path: 'callback', component: CallbackComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'track/:trackID', component: TrackComponent, canActivate: [AuthGuard, SpotifyGuard]},
  { path: 'library/albums', component: AlbumsComponent, canActivate: [AuthGuard, SpotifyGuard]},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
