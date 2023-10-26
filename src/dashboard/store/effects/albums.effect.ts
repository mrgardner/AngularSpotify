import { Injectable } from "@angular/core";
import { ApolloService } from "@app/services/apollo/apollo.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { AlbumsApiActions } from "../actions/album.action";
import { selectAlbums } from "../selectors/albums.selectors";

@Injectable()
export class AlbumsEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService, private store: Store) { }

  albums$ = createEffect(() => this.actions$.pipe(
    ofType(AlbumsApiActions.loadAlbums),
    withLatestFrom(this.store.select(selectAlbums)),
    // TODO: ADD TYPE
    switchMap((res: any) => {
      const albums = res[1];
      return this.apolloService.getAlbums(albums.length).pipe(
        map((response: any) => {
          const sortedAlbums = response.items.map((album: any) => {
            return {
              id: album.album.id,
              name: album.album.name,
              image: album.album.images.length > 0 ? album.album.images[0].url : '',
              ownerId: album.album.artists[0].name,
              type: album.album.type
            }
          });
          const updateAlbums = albums.concat(sortedAlbums);
          const next = response.next !== null ? response.next.split('v1/')[1] : '';

          return AlbumsApiActions.loadAlbumsSuccess({
            payload: {
              albums: updateAlbums,
              total: response.total,
              next,
              canLoadMore: response.total > updateAlbums.length
            }
          })
        }),
        catchError(error => of(AlbumsApiActions.loadAlbumsFail({ payload: error })))
      );
    })
  ));
}