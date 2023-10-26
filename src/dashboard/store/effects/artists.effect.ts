import { Injectable } from "@angular/core";
import { ApolloService } from "@app/services/apollo/apollo.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ArtistsApiActions } from "../actions/artists.action";

@Injectable()
export class ArtistsEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService) { }

  artists$ = createEffect(() => this.actions$.pipe(
    ofType(ArtistsApiActions.loadArtists),
    // withLatestFrom(this.store.select(selectAlbums)),
    // TODO: ADD TYPE
    switchMap(() => {
      // const albums = res[1];
      return this.apolloService.getFollowedArtists().pipe(
        map((response: any) => {
          console.log(response)
          const sortedArtists = response.items.map((artist: any) => {
            return {
              id: artist.id,
              name: artist.name,
              image: artist.images.length > 0 ? artist.images[0].url : '',
              type: artist.type
            }
          });
          // const updateArtists = albums.concat(sortedArtists);
          const next = response.next !== null ? response.next.split('v1/')[1] : '';

          return ArtistsApiActions.loadArtistsSuccess({
            payload: {
              artists: sortedArtists,
              total: response.total,
              next,
              canLoadMore: response.total > sortedArtists.length
            }
          })
        }),
        catchError(error => of(ArtistsApiActions.loadArtistsFail({ payload: error })))
      );
    })
  ));
}