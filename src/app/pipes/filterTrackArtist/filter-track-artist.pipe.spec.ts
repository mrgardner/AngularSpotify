import { FilterTrackArtistPipe } from './filter-track-artist.pipe';
import { Artist } from '../../interfaces/artist/artist.interface';
import { Track } from '../../interfaces/track/track.interface';

describe('FilterTrackArtistPipe', () => {
  it('create an instance filter track artist pipe', () => {
    const pipe = new FilterTrackArtistPipe();
    expect(pipe).toBeTruthy();
  });

  it('check displayArtists method with 1 artist', () => {
    const artists: Array<Artist> = [
      {
        external_urls: '',
        id: '',
        name: 'Test1',
        type: '',
        uri: ''
      }
    ];
    const pipe = new FilterTrackArtistPipe();
    const combinedArtists = pipe.displayArtists(artists).join('');
    expect(combinedArtists).toEqual('Test1');
  });

  it('check displayArtists method with 2 artists', () => {
    const artists: Array<Artist> = [
      {
        external_urls: '',
        id: '',
        name: 'Test1',
        type: '',
        uri: ''
      },
      {
        external_urls: '',
        id: '',
        name: 'Test2',
        type: '',
        uri: ''
      }
    ];
    const pipe = new FilterTrackArtistPipe();
    const combinedArtists = pipe.displayArtists(artists).join('');
    expect(combinedArtists).toEqual('Test1, Test2');
  });

  it('check transform method with args', () => {
    const tracks: Array<Track> = [
      {
        album: {
          album_type: '',
          artists: [],
          available_markets: [],
          external_urls: {
            spotify: ''
          },
          href: '',
          id: '',
          images: [],
          name: '',
          release_date: '',
          release_date_precision: '',
          total_track: 0,
          type: '',
          uri: ''
        },
        artists: [
          {
            external_urls: '',
            id: '',
            name: 'Test1',
            type: '',
            uri: ''
          },
          {
            external_urls: '',
            id: '',
            name: 'Test2',
            type: '',
            uri: ''
          }
        ],
        available_markets: [],
        disc_number: 0,
        duration_ms: 0,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: '',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: '',
        artist: '',
        time: '',
        addedAt: ''
      }
    ];
    const pipe = new FilterTrackArtistPipe();
    const combinedArtists = pipe.transform(tracks, 'tes');
    expect(combinedArtists).toEqual(tracks);
  });

  it('check transform method without args', () => {
    const tracks: Array<Track> = [
      {
        album: {
          album_type: '',
          artists: [],
          available_markets: [],
          external_urls: {
            spotify: ''
          },
          href: '',
          id: '',
          images: [],
          name: '',
          release_date: '',
          release_date_precision: '',
          total_track: 0,
          type: '',
          uri: ''
        },
        artists: [
          {
            external_urls: '',
            id: '',
            name: 'Test1',
            type: '',
            uri: ''
          },
          {
            external_urls: '',
            id: '',
            name: 'Test2',
            type: '',
            uri: ''
          }
        ],
        available_markets: [],
        disc_number: 0,
        duration_ms: 0,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: '',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: '',
        artist: '',
        time: '',
        addedAt: ''
      }
    ];
    const pipe = new FilterTrackArtistPipe();
    const combinedArtists = pipe.transform(tracks);
    expect(combinedArtists).toEqual(tracks);
  });
});
