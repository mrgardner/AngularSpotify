import { Injectable } from "@angular/core";
import { SpotifyPlaylistRespose } from "@core/interfaces/playlist/playlist.interface";
import { ApolloService } from "@core/services/apollo/apollo.service";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { PLAYLIST_TYPES } from "@side-nav/constants/actions.constant";
import { of } from "rxjs";
import { catchError, map, switchMap, take } from "rxjs/operators";
import * as playlistActions from '../actions/playlist.action';
import * as fromStore from '../../store';

@Injectable()
export class PlaylistEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService, private store: Store) { }

  loadPlaylists$ = createEffect(() => this.actions$.pipe(
    ofType(PLAYLIST_TYPES.LOAD_PLAYLISTS),
    switchMap(() => {
      return this.apolloService.getPlaylists().pipe(
        map((response: SpotifyPlaylistRespose) => {
          const playlists = response.items;
          const total = response.total;
          const nextPlaylist = response.next;

          return new playlistActions.LoadPlaylistsSuccess({ nextPlaylist, data: playlists, total });
        }),
        catchError(error => of(new playlistActions.LoadPlaylistsFail(error)))
      );
    })
  ))

  loadPlaylistsByUrl$ = createEffect(() => this.actions$.pipe(
    ofType(PLAYLIST_TYPES.LOAD_PLAYLISTS_BY_URL),
    switchMap(() => this.store.select(fromStore.getNextPlaylists)),
    take(1),
    switchMap((url) => {
      return this.apolloService.getPlaylists(url).pipe(
        map((response: SpotifyPlaylistRespose) => {
          const playlists = response.items;
          const total = response.total;
          const nextPlaylist = response.next;

          return new playlistActions.LoadPlaylistsByURLSuccess({ nextPlaylist, data: playlists, total });
        }),
        catchError(error => of(new playlistActions.LoadPlaylistsFail(error)))
      );
    })
  ))
}


// .subscribe((data: SpotifyPlaylistRespose) => {
//   if (data.items) {
//     this.playlists = data.items.map((playlist: Playlist) => {
//       let selected = false;
//       if (playlist.name === this.selectedPlaylist) {
//         selected = true;
//       }
//       const selectedUrl = playlist.name.toLowerCase();
//       return { ...playlist, selected, selectedUrl };
//     });
//     // this.loading = false;
//     // this.playlistsLoaded = true;
//     this.playlistTotal = data.total;
//     this.nextPlaylist = data.next;
//   }
// });