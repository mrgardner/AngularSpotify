import { Injectable } from "@angular/core";
import { SortedTrack, TrackResponse, Trrack } from "@app/interfaces/track/track.interface";
import { ApolloService } from "@app/services/apollo/apollo.service";
import { UtilService } from "@app/services/util/util.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { PlaylistApiActions } from "../actions/playlist.action";

@Injectable()
export class PlaylistEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService, private utilService: UtilService) { }

  loadPlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistApiActions.loadPlaylist),
    exhaustMap((action: any) => {
      console.log(action);
      return this.apolloService.getTracksFromPlaylist(action.payload).pipe(
        map((tracks: TrackResponse) => {
          const sortedTracks: SortedTrack[] = tracks.items.map((t: Trrack) => {
            return {
              title: t.track.name,
              artist: this.utilService.displayArtists(t.track.artists).join(''),
              album_name: t.track.album.name,
              added_at: t.added_at.split('T')[0],
              time: t.track.duration_ms,
              showPlayButton: false,
              showPauseButton: false,
              showTrackNumber: true,
              duration: t.track.duration_ms,
              uri: t.track.uri,
              total: tracks.total,
              size: tracks.limit,
              name: '',
              remove: false,
              is_local: false,
              track: null,
              artists: [],
              filterText: `${t.track.name.toLowerCase()}
                ${this.utilService.displayArtists(t.track.artists).join('').toLowerCase()}
                ${t.track.album.name.toLowerCase()}`.replace(/\s/g, '').trim(),
            }
          });
          console.log(sortedTracks)
          return PlaylistApiActions.loadPlaylistSuccess({ payload: sortedTracks })
        }),
        catchError(() => EMPTY)
      )
    })
  ));
  // .pipe(
  //   map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
  //   catchError(() => EMPTY)
  // ))
  // )
  // ofType(PlaylistApiActions.loadPlaylist),
  // exhaustMap((action) => {
  //   console.log(action)
  //   return this.apolloService.getTracksFromPlaylist(action.payload.playlistId, action.payload.offset, action.payload.limit)
  //     .pipe(
  //       map(() => PlaylistApiActions.loadPlaylistSuccess({ payload: '' }))
  //     )
  // })
}

