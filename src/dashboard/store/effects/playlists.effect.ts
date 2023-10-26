import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SpotifyPlaylistRespose } from "@app/interfaces/playlist/playlist.interface";
import { ApolloService } from "@app/services/apollo/apollo.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { PlaylistsApiActions } from "../actions/playlists.action";
import { selectPlaylist, selectPlaylists } from "../selectors/playlists.selectors";

@Injectable()
export class PlaylistsEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService, private store: Store, private router: Router) { }

  loadPlaylists$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistsApiActions.loadPlaylists),
    withLatestFrom(this.store.select(selectPlaylists)),
    // TODO: ADD TYPE
    switchMap((res: any) => {
      const playlists = res[1];
      return this.apolloService.getPlaylists(playlists.length).pipe(
        map((response: SpotifyPlaylistRespose) => {
          const sortedTracks = response.items.map((playlist) => {
            return {
              id: playlist.id,
              name: playlist.name,
              image: playlist.images.length > 0 ? playlist.images[0].url : '',
              ownerId: playlist.owner.id,
              ownerName: playlist.owner.display_name,
              type: playlist.type
            }
          });
          const updatePlaylists = playlists.concat(sortedTracks);
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
    switchMap(() => of(PlaylistsApiActions.navigateToPlaylist()))
  ));

  navigateToPlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistsApiActions.navigateToPlaylist),
    withLatestFrom(this.store.select(selectPlaylist)),
    tap((latest: any) => this.router.navigate(['dashboard', 'playlist', encodeURI(latest[1].id)]))
  ), { dispatch: false });
}