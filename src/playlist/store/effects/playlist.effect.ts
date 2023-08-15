import { Injectable } from "@angular/core";
import { SortedTrack, TrackResponse, Trrack } from "@app/interfaces/track/track.interface";
import { ApolloService } from "@app/services/apollo/apollo.service";
import { UtilService } from "@app/services/util/util.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { PlaylistApiActions } from "../actions/playlist.action";

@Injectable()
export class PlaylistEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService, private utilService: UtilService) { }

  // TODO: Refactor GraphQL Side to combine both of these effects
  loadPlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistApiActions.loadPlaylist),
    switchMap((action: any) => {
      return this.apolloService.getPlaylist(action.payload).pipe(
        map((response: any) => {
          return PlaylistApiActions.loadPlaylistSuccess({
            payload: {
              followers: response.followers.total,
              id: response.id,
              image: response.images[0].url,
              name: response.name,
              owner: response.owner.display_name,
              public: response.public
            }
          })
        }),
        catchError(error => of(PlaylistApiActions.loadPlaylistFail({ payload: error })))
      )
    })
  ));

  loadTracksFromPlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistApiActions.loadPlaylistTracks),
    switchMap((action: any) => {
      return this.apolloService.getTracksFromPlaylist(action.payload).pipe(
        map((tracks: TrackResponse) => {
          const sortedTracks: SortedTrack[] = tracks.items.map((t: Trrack) => {
            return {
              title: t.track.name,
              artist: this.utilService.displayArtists(t.track.artists).join(''),
              album_name: t.track.album.name,
              album_image: t.track.album.images[0].url,
              added_at: t.added_at.split('T')[0],
              time: t.track.duration_ms,
              showPlayButton: false,
              showPauseButton: false,
              showTrackNumber: true,
              duration: t.track.duration_ms,
              uri: t.track.uri,
              remove: false,
              is_local: t.is_local,
              filterText: `${t.track.name.toLowerCase()}
                ${this.utilService.displayArtists(t.track.artists).join('').toLowerCase()}
                ${t.track.album.name.toLowerCase()}`.replace(/\s/g, '').trim(),
            }
          });
          return PlaylistApiActions.loadPlaylistTracksSuccess({
            payload: {
              tracks: sortedTracks,
              pageSize: tracks.limit,
              tracksLength: tracks.total
            }
          })
        }),
        catchError(error => of(PlaylistApiActions.loadPlaylistTracksFail({ payload: error })))
      )
    })
  ));
}

