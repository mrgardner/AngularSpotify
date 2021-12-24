// Apollo
import { Apollo } from 'apollo-angular';

// Common
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaces
import { ApolloAlbumResult, AlbumApolloResponse } from '@app/interfaces/apollo/apollo.inerface';

// Queries
import { ALBUM_INFO } from '@app/queries/get-albums';
import { FOLLOWED_ARTISTS } from '@app/queries/get-artists';
import { PLAYLIST_NAME, PLAYLIST_TRACKS, PLAYLIST_INFO } from '@app/queries/get-playlists';
import { USER_DISPLAY_NAME } from '@app/queries/get-user';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  // TODO: Fix types
  private readonly spotifyApiBaseURI: string;
  constructor(private apollo: Apollo) {
    this.spotifyApiBaseURI = 'https://api.spotify.com/v1';
  }

  getUserDisplayName() {
    return this.apollo
      .watchQuery({
        query: USER_DISPLAY_NAME,
        fetchPolicy: 'cache-first',
        variables: {
          url: `${this.spotifyApiBaseURI}/me`
        },
        errorPolicy: 'all'
      })
      .valueChanges.pipe(map((result: any) => result.data.user));
  }

  getPlaylists(morePlaylists?: string) {
    const url = morePlaylists ? morePlaylists : this.spotifyApiBaseURI + '/me/playlists?limit=50';
    return this.apollo
      .watchQuery({
        query: PLAYLIST_NAME,
        fetchPolicy: 'cache-first',
        variables: {
          url
        },
        errorPolicy: 'all'
      })
      .valueChanges.pipe(map((result: any) => result.data.playlists));
  }

  getPlaylist(playlistID: string) {
    const url = `${this.spotifyApiBaseURI}/playlists/${playlistID}`;
    return this.apollo
      .watchQuery({
        query: PLAYLIST_INFO,
        fetchPolicy: 'cache-first',
        variables: {
          url
        },
        errorPolicy: 'all'
      })
      .valueChanges.pipe(map((result: any) => result.data.playlist));
  }

  getTracksFromPlaylist(playlistID: string, offset: number, limit: number) {
    const trackOffset = offset * limit;
    const url = this.spotifyApiBaseURI + `/playlists/${playlistID}/tracks?offset=${trackOffset.toString()}&limit=${limit.toString()}`;

    return this.apollo
      .watchQuery({
        query: PLAYLIST_TRACKS,
        fetchPolicy: 'cache-first',
        variables: {
          url
        },
        errorPolicy: 'all'
      })
      .valueChanges.pipe(map((result: any) => result.data.playlistTracks));
  }

  getAlbums(moreAlbums?: string): Observable<ApolloAlbumResult> {
    const url = moreAlbums ? moreAlbums : this.spotifyApiBaseURI + `/me/albums?limit=50`;

    return this.apollo
      .watchQuery({
        query: ALBUM_INFO,
        fetchPolicy: 'cache-first',
        variables: {
          url
        },
        errorPolicy: 'all'
      })
      .valueChanges.pipe(map((result: AlbumApolloResponse) => result.data.albums));
  }

  getFollowedArtists() {
    const url = this.spotifyApiBaseURI + `/me/following?type=artist`;
    return this.apollo
      .watchQuery({
        query: FOLLOWED_ARTISTS,
        fetchPolicy: 'cache-first',
        variables: {
          url
        },
        errorPolicy: 'all'
      })
      .valueChanges.pipe(map((result: any) => result.data.followedArtists));
  }
}

