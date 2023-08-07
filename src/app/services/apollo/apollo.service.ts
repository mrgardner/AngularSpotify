// Apollo
import { Apollo } from 'apollo-angular';

// Common
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// Interfaces
import { AlbumApolloResponse, DisplayNameApolloResponse } from '@app/interfaces/apollo/apollo.inerface';

// Queries
import { ALBUM_INFO } from '@app/queries/get-albums';
import { FOLLOWED_ARTISTS } from '@app/queries/get-artists';
import { PLAYLIST_INFO, PLAYLIST_NAME, PLAYLIST_TRACKS } from '@app/queries/get-playlists';
import { USER_DISPLAY_NAME } from '@app/queries/get-user';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  // TODO: Fix types
  constructor(private apollo: Apollo) { }

  getUserDisplayName() {
    return this.apollo
      .watchQuery({
        query: USER_DISPLAY_NAME,
        fetchPolicy: 'cache-first',
        errorPolicy: 'all'
      })
      .valueChanges.pipe(map((result: DisplayNameApolloResponse) => {
        return result.data.user.display_name;
      }));
  }

  getPlaylists(offset: number) {
    return this.apollo
      .watchQuery({
        query: PLAYLIST_NAME,
        fetchPolicy: 'cache-first',
        variables: {
          offset
        },
        errorPolicy: 'all'
      })
      .valueChanges.pipe(map((result: any) => result.data.playlists));
  }

  getPlaylist(playlistID: string) {
    return this.apollo
      .watchQuery({
        query: PLAYLIST_INFO,
        fetchPolicy: 'cache-first',
        variables: {
          playlistID
        },
        errorPolicy: 'all'
      })
      .valueChanges.pipe(map((result: any) => result.data.playlist));
  }

  getTracksFromPlaylist(playlistID: string, offset: number, limit: number) {
    const trackOffset = offset * limit;

    return this.apollo
      .watchQuery({
        query: PLAYLIST_TRACKS,
        fetchPolicy: 'cache-first',
        variables: {
          trackOffset,
          playlistID,
          limit
        },
        errorPolicy: 'all'
      })
      .valueChanges.pipe(map((result: any) => result.data.playlistTracks));
  }

  getAlbums(offset: number) {
    return this.apollo
      .watchQuery({
        query: ALBUM_INFO,
        fetchPolicy: 'cache-first',
        variables: {
          offset
        },
        errorPolicy: 'all'
      })
      .valueChanges.pipe(map((result: AlbumApolloResponse) => result.data.albums));
  }

  getFollowedArtists() {
    // TODO: Revisit and Hook up
    // const url = this.spotifyApiBaseURI + `/me/following?type=artist`;
    return this.apollo
      .watchQuery({
        query: FOLLOWED_ARTISTS,
        fetchPolicy: 'cache-first',
        errorPolicy: 'all'
      })
      .valueChanges.pipe(map((result: any) => result.data.followedArtists));
  }
}