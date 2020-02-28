// Interfaces
import { ApolloPlaylistTracksResult, ApolloPlaylistResult, ApolloPlaylistsResult, PlaylistNavMenu, ApolloAlbumResult } from '@interfaces/apollo/apollo.inerface';

const mockAlbums = (name: string): ApolloAlbumResult => {
  return {
    total: 0,
    items: [
      {
        artists: [
          {
            name: ''
          }
        ],
        images: [
          {
            url: ''
          }
        ],
        name
      }
    ],
    next: ''
  };
};

const mockPlaylistTracks = (albumName: string, name: string, artistName: string): ApolloPlaylistTracksResult => {
  return {
    total: 0,
    limit: 0,
    items: [
      {
        added_at: '',
        track: {
          album: {
            name: albumName
          },
          artists: [
            {
              name: artistName
            }
          ],
          name,
          duration_ms: 0,
          uri: ''
        }
      }
    ]
  };
};

const mockPlaylist = (name: string): ApolloPlaylistResult => {
  return {
    name,
    id: '',
    owner: {
      display_name: ''
    },
    tracks: {
      total: 0
    },
    images: [
      {
        url: ''
      }
    ],
    followers: {
      total: 0
    }
  };
};

const mockPlaylists = (name: string): ApolloPlaylistsResult => {
  return {
    total: 0,
    items: [
      {
        name,
        id: '',
        selected: false,
        selectedUrl: ''
      }
    ],
    next: ''
  };
};

const mockPlaylistNavMenu = (name: string, id: string, selected: boolean, selectedUrl: string): PlaylistNavMenu => {
  return {
    name,
    id,
    selected,
    selectedUrl
  };
};

export { mockAlbums, mockPlaylist, mockPlaylists, mockPlaylistNavMenu, mockPlaylistTracks };
