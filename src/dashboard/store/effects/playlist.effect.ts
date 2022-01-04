import { Injectable } from "@angular/core";
import { Playlist, SpotifyPlaylistRespose } from "@app/interfaces/playlist/playlist.interface";
import { ApolloService } from "@app/services/apollo/apollo.service";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { PLAYLIST_TYPES } from "@dashboard/constants/actions.constant";
import { of } from "rxjs";
import { catchError, map, switchMap, take } from "rxjs/operators";
import * as playlistActions from '../actions/playlist.action';
import * as fromStore from '@dashboard/store';

@Injectable()
export class PlaylistEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService, private store: Store) { }

  loadPlaylists$ = createEffect(() => this.actions$.pipe(
    ofType(PLAYLIST_TYPES.LOAD_PLAYLISTS),
    switchMap(() => this.store.select(fromStore.getNextPlaylistsAndEntities)),
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

          return new playlistActions.LoadPlaylistsSuccess({ nextPlaylist, entities, total, canLoadMore });
        }),
        catchError(error => of(new playlistActions.LoadPlaylistsFail(error)))
      );
    })
  ))

  loadPlaylistsByUrl$ = createEffect(() => this.actions$.pipe(
    ofType(PLAYLIST_TYPES.LOAD_PLAYLISTS_BY_URL),
    switchMap(() => this.store.select(fromStore.getNextPlaylistsAndEntities)),
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

          return new playlistActions.LoadPlaylistsByURLSuccess({ nextPlaylist, entities, total, canLoadMore });
        }),
        catchError(error => of(new playlistActions.LoadPlaylistsFail(error)))
      );
    })
  ))
}