import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { USER_DISPLAY_NAME } from '../../queries/get-user';
import { PLAYLIST_NAME } from '../../queries/get-playlists';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  private readonly spotifyApiBaseURI: string;
  constructor(private apollo: Apollo) {
    this.spotifyApiBaseURI = 'https://api.spotify.com/v1';
  }

  getUserDisplayName() {
    return this.apollo
    .watchQuery({
      query: USER_DISPLAY_NAME,
      fetchPolicy: 'cache-and-network'
    })
    .valueChanges.pipe(map((result: any) => result.data.User));
  }

  getPlaylists(morePlaylists?: string) {
    const url = morePlaylists ? morePlaylists : this.spotifyApiBaseURI + '/me/playlists?limit=50';
    return this.apollo
    .watchQuery({
      query: PLAYLIST_NAME,
      fetchPolicy: 'cache-and-network',
      variables: {
        url
      }
    })
    .valueChanges.pipe(map((result: any) => result.data.playlists));
  }
}
