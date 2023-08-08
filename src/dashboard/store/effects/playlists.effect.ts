import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SpotifyPlaylistRespose } from "@app/interfaces/playlist/playlist.interface";
import { ApolloService } from "@app/services/apollo/apollo.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map, tap, withLatestFrom } from "rxjs/operators";
import { PlaylistsApiActions } from "../actions/playlists.action";
import { selectPlaylist, selectPlaylists } from "../selectors/playlists.selectors";

@Injectable()
export class PlaylistEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService, private store: Store, private router: Router) { }

  loadPlaylists$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistsApiActions.loadPlaylists),
    withLatestFrom(this.store.select(selectPlaylists)),
    // TODO: ADD TYPE
    exhaustMap((res: any) => {
      const playlists = res[1];
      return this.apolloService.getPlaylists(playlists.length).pipe(
        map((response: SpotifyPlaylistRespose) => {
          const updatePlaylists = playlists.concat(response.items);
          const next = response.next !== null ? response.next.split('v1/')[1] : '';

          return PlaylistsApiActions.loadPlaylistsSuccess({
            payload: {
              next,
              playlists: updatePlaylists,
              total: response.total,
              canLoadMore: response.total > updatePlaylists.length
            }
          });
        }),
        catchError(error => of(PlaylistsApiActions.loadPlaylistsFail(error)))
      );
    })
  ));

  updateSelectedPlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistsApiActions.updateSelectedPlaylist),
    withLatestFrom(this.store.select(selectPlaylist)),
    tap((latest: any) => this.router.navigate(['dashboard', 'playlist', encodeURI(latest[1].id)]))
  ), { dispatch: false });
}