// Interfaces
import { ApolloPlaylistTracksResult, ApolloPlaylistResult } from '@interfaces/apollo/apollo.inerface';

const mockPlaylistTracksResult = (albumName: string, name: string, artistName: string): ApolloPlaylistTracksResult => {
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

const mockPlaylistResult = (name: string): ApolloPlaylistResult => {
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

export { mockPlaylistResult, mockPlaylistTracksResult };
