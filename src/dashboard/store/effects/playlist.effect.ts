import { Injectable } from "@angular/core";
import { Playlist, SpotifyPlaylistRespose } from "@app/interfaces/playlist/playlist.interface";
import { ApolloService } from "@app/services/apollo/apollo.service";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, take, tap } from "rxjs/operators";
import { PlaylistsApiActions } from "../actions/playlist.action";
import { getNextPlaylistsAndEntities, getSelectedPlaylist } from "../selectors/playlists.selectors";
import { Router } from "@angular/router";

@Injectable()
export class PlaylistEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService, private store: Store, private router: Router) { }


  // TODO: FIX EFFECTS
  loadPlaylists$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistsApiActions.loadPlaylists),
    switchMap(() => this.store.select(getNextPlaylistsAndEntities)),
    take(1),
    switchMap((res) => {
      return this.apolloService.getPlaylists().pipe(
        map((response: SpotifyPlaylistRespose) => {
          const playlists = response.items;
          const total = response.total;
          const nextPlaylist = response.next;
          const entitiesState = Object(res[1]);

          // TODO: Improve this to break out duplicate code into helper functions
          const mappedData = playlists.map((playlist: Playlist) => {
            const selectedUrl = playlist.name.toLowerCase();
            return { ...playlist, selected: false, selectedUrl };
          });

          const canLoadMore = total > mappedData.length;

          const entities = mappedData.reduce((entities: { [id: number]: Playlist }, playlist: Playlist) => {
            return {
              ...entities,
              [playlist.id]: playlist
            }
          }, {
            ...entitiesState
          });

          return PlaylistsApiActions.loadPlaylistsSuccess({ payload: { nextPlaylist, entities, total, canLoadMore } });
        }),
        catchError(error => of(PlaylistsApiActions.loadPlaylistsFail(error)))
      );
    })
  ));

  loadPlaylistsByUrl$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistsApiActions.loadPlaylistsByURL),
    switchMap(() => this.store.select(getNextPlaylistsAndEntities)),
    take(1),
    switchMap((res) => {
      return this.apolloService.getPlaylists(String(res[0])).pipe(
        map((response: SpotifyPlaylistRespose) => {
          const playlists = response.items;
          const total = response.total;
          const nextPlaylist = response.next;
          const entitiesState = Object(res[1]);

          const mappedData = playlists.map((playlist: Playlist) => {
            const selectedUrl = playlist.name.toLowerCase();
            return { ...playlist, selected: false, selectedUrl };
          });

          const previousData = Object.keys(entitiesState).map(id => entitiesState[id]);
          const mergedData = previousData.concat(mappedData);
          const canLoadMore = total > mergedData.length;
          const entities = mergedData.reduce((entities: { [id: number]: Playlist }, playlist: Playlist) => {
            return {
              ...entities,
              [playlist.id]: playlist
            }
          }, {
            ...entitiesState
          });

          return PlaylistsApiActions.loadPlaylistsByURLSuccess({ payload: { nextPlaylist, entities, total, canLoadMore } });
        }),
        catchError(error => of(PlaylistsApiActions.loadPlaylistsByURLFail(error)))
      );
    })
  ));

  selectPlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistsApiActions.updateSelectedPlaylist),
    switchMap(() => this.store.select(getSelectedPlaylist)),
    tap((playlist: any) => this.router.navigate(['dashboard', 'playlist', encodeURI(playlist.id)]))
  ));
}