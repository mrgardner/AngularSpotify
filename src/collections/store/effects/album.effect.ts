import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, map, switchMap, take } from "rxjs/operators";
import { AlbumApiActions } from "../actions/album.action";
import { ApolloService } from "@app/services/apollo/apollo.service";
import { Store } from "@ngrx/store";
import { selectNextAlbumAndPreviousAlbums } from "../selectors/album.selectors";

@Injectable()
export class AlbumEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService, private store: Store) { }

  // TODO: Rethink logic and remove take, then make same fix for playlist.effect.ts
  album$ = createEffect(() => this.actions$.pipe(
    ofType(AlbumApiActions.album),
    switchMap(() => this.store.select(selectNextAlbumAndPreviousAlbums)),
    take(2),
    // TODO: ADD TYPE
    switchMap((res) => {
      console.log(res)
      return this.apolloService.getAlbums(String(res[0])).pipe(
        map((response: any) => {
          const { items, total, next } = response;
          return AlbumApiActions.albumSuccess({
            payload: {
              albums: Object(res[1]).concat(items),
              total,
              next,
              canLoadMore: total > items.length
            }
          })
        }),
        catchError(error => of(AlbumApiActions.albumFail(error)))
      );
    })
  ));
}