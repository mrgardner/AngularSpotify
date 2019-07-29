import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { USER_DISPLAY_NAME } from '../../queries/get-user';
import { PLAYLIST_NAME, PLAYLIST_TRACKS, PLAYLIST_INFO} from '../../queries/get-playlists';

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
      fetchPolicy: 'network-only'
    })
    .valueChanges.pipe(map((result: any) => result.data.user));
  }

  getPlaylists(morePlaylists?: string) {
    const url = morePlaylists ? morePlaylists : this.spotifyApiBaseURI + '/me/playlists?limit=50';
    return this.apollo
    .watchQuery({
      query: PLAYLIST_NAME,
      fetchPolicy: 'network-only',
      variables: {
        url
      }
    })
    .valueChanges.pipe(map((result: any) => result.data.playlists));
  }

  getPlaylist(playlistID: string) {
    const url = `${this.spotifyApiBaseURI}/playlists/${playlistID}`;
    return this.apollo
    .watchQuery({
      query: PLAYLIST_INFO,
      fetchPolicy: 'network-only',
      variables: {
        url
      }
    })
    .valueChanges.pipe(map((result: any) => result.data.playlist));
  }

  getTracksFromPlaylist(playlistID: string, offset: number, limit: number) {
    const trackOffset = offset * limit;
    const url = this.spotifyApiBaseURI + `/playlists/${playlistID}/tracks?offset=${trackOffset.toString()}&limit=${limit.toString()}`;

    return this.apollo
    .watchQuery({
      query: PLAYLIST_TRACKS,
      fetchPolicy: 'network-only',
      variables: {
        url
      }
    })
    .valueChanges.pipe(map((result: any) => result.data.playlistTracks));
  }
}
