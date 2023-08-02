// Common
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '@app/modules/angular-material.module';
import { StoreModule } from '@ngrx/store';
import { dashboardComponents } from './components';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '@app/guards/auth/auth.guard';
import { EffectsModule } from '@ngrx/effects';
import { dashboardServices } from '@dashboard/services';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { AngularModule } from '@app/modules/angular.module';
import { HttpHeaders } from "@angular/common/http";
import { APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';


export const ROUTES: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: 'collections',
        loadChildren: () => import('@collections/collections.module').then(m => m.CollectionsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'playlist',
        loadChildren: () => import('src/playlist/playlist.module').then(m => m.PlaylistModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'search',
        loadChildren: () => import('@search/search.module').then(m => m.SearchModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'tracks',
        loadChildren: () => import('@tracks/tracks.module').then(m => m.TracksModule),
        canActivate: [AuthGuard]
      }
    ]
  },

];
@NgModule({
  declarations: [
    ...dashboardComponents
  ],
  imports: [
    AngularModule,
    AngularMaterialModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('dashboard', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    ...dashboardServices,
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        const http = httpLink.create({ uri: 'http://localhost:4000/graphql' });
        console.log(sessionStorage.getItem('spotifyToken'));
        const middleware = new ApolloLink((operation, forward) => {
          operation.setContext({
            headers: new HttpHeaders().set(
              'authorization',
              `Bearer ${sessionStorage.getItem('spotifyToken') || null}`,
            ),
          });
          return forward(operation);
        });

        const link = middleware.concat(http);

        return {
          link,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
  exports: [
    ...dashboardComponents
  ]
})
export class DashboardModule { }