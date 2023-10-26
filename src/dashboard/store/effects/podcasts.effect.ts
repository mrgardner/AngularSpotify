import { Injectable } from "@angular/core";
import { ApolloService } from "@app/services/apollo/apollo.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { PodcastsApiActions } from "../actions/podcasts.action";
import { selectPodcasts } from "../selectors/podcasts.selectors";

@Injectable()
export class PodcastsEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService, private store: Store) { }

  podcasts$ = createEffect(() => this.actions$.pipe(
    ofType(PodcastsApiActions.loadPodcasts),
    withLatestFrom(this.store.select(selectPodcasts)),
    // TODO: ADD TYPE
    switchMap((res: any) => {
      const podcasts = res[1];
      return this.apolloService.getPodcasts(podcasts.length).pipe(
        map((response: any) => {
          const sortedPodcasts = response.items.map((podcast: any) => {
            return {
              id: podcast.show.id,
              name: podcast.show.name,
              image: podcast.show.images.length > 0 ? podcast.show.images[0].url : '',
              explicit: podcast.show.explicit,
              ownerId: podcast.show.publisher,
              type: podcast.show.type
            }
          });
          const updatedPodcasts = podcasts.concat(sortedPodcasts);
          const next = response.next !== null ? response.next.split('v1/')[1] : '';

          return PodcastsApiActions.loadPodcastsSuccess({
            payload: {
              podcasts: updatedPodcasts,
              total: response.total,
              next,
              canLoadMore: response.total > updatedPodcasts.length
            }
          })
        }),
        catchError(error => of(PodcastsApiActions.loadPodcastsFail({ payload: error }))));
    })
  ));
}