// Common
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';
import { AlbumsComponent } from '@collections/components/albums/albums.component';
import { ArtistsComponent } from '@collections/components/artists/artists.component';
import { CollectionComponent } from '@collections/components/collection/collection.component';
import { LikedSongsComponent } from '@collections/components/liked-songs/liked-songs.component';
import { MadeForYouComponent } from '@collections/components/made-for-you/made-for-you.component';
import { PlaylistsComponent } from '@collections/components/playlists/playlists.component';
import { PodcastsComponent } from '@collections/components/podcasts/podcasts.component';
import { AngularMaterialModule } from '@app/modules/angular-material.module';
import { AngularModule } from '@app/modules/angular.module';
import { StoreModule } from '@ngrx/store';
import { collectionComponents } from './components';
import { collectionPipes } from './pipes';

const ROUTES: Routes = [
  {
    path: '', component: CollectionComponent, canActivate: [AuthGuard], children: [
      { path: 'playlists', component: PlaylistsComponent, canActivate: [AuthGuard] },
      { path: 'made-for-you', component: MadeForYouComponent, canActivate: [AuthGuard] },
      { path: 'liked-songs', component: LikedSongsComponent, canActivate: [AuthGuard] },
      { path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard] },
      { path: 'artists', component: ArtistsComponent, canActivate: [AuthGuard] },
      { path: 'podcasts', component: PodcastsComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  declarations: [
    ...collectionComponents,
    ...collectionPipes
  ],
  imports: [
    AngularMaterialModule,
    AngularModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('collections', {})
  ],
  exports: [
    ...collectionComponents,
    ...collectionPipes
  ]
})
export class CollectionsModule { }