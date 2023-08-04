import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { AlbumApiActions } from "../actions/album.action";
import { ApolloService } from "@app/services/apollo/apollo.service";
import { Store } from "@ngrx/store";
import { selectAlbums } from "../selectors/album.selectors";
// import { AlbumState } from "../model/album.model";

@Injectable()
export class AlbumEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService, private store: Store) { }

  album$ = createEffect(() => this.actions$.pipe(
    ofType(AlbumApiActions.album),
    withLatestFrom(this.store.select(selectAlbums)),
    // TODO: ADD TYPE
    switchMap((res: any) => {
      const albums = res[1];
      return this.apolloService.getAlbums(albums.length).pipe(
        map((response: any) => {
          const updateAlbums = albums.concat(response.items);
          const next = response.next !== null ? response.next.split('v1/')[1] : '';

          return AlbumApiActions.albumSuccess({
            payload: {
              albums: updateAlbums,
              moreAlbums: {
                total: response.total,
                next,
                canLoadMore: response.total > updateAlbums.length
              }
            }
          })
        }),
        catchError(error => of(AlbumApiActions.albumFail({ payload: error })))
      );
    })
  ));
}