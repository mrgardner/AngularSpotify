// Pipes
import { FilterAlbumNamePipe } from '@collections/pipes/filter-album-name/filter-album-name.pipe';

describe('FilterAlbumNamePipe', () => {
  it('create an instance filter album name pipe', () => {
    const pipe = new FilterAlbumNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('check transform method', () => {
    // const pipe = new FilterAlbumNamePipe();
    // const albums = pipe.transform([
    //   {
    //     album: {
    //       album_type: '',
    //       artists: [],
    //       available_markets: [],
    //       external_urls: {
    //         spotify: ''
    //       },
    //       href: '',
    //       id: '',
    //       images: [],
    //       name: 'test',
    //       release_date: '',
    //       release_date_precision: '',
    //       total_track: 0,
    //       type: '',
    //       uri: ''
    //     },
    //     artists: [],
    //     available_markets: [],
    //     disc_number: 0,
    //     duration_ms: 0,
    //     explicit: true,
    //     external_ids: {
    //       isrc: ''
    //     },
    //     external_urls: {
    //       spotify: ''
    //     },
    //     href: '',
    //     id: '',
    //     name: '',
    //     popularity: 0,
    //     preview_url: '',
    //     track_number: 0,
    //     type: '',
    //     uri: '',
    //     isPlayButtonShowing: true,
    //     isPauseButtonShowing: true,
    //     remove: true,
    //     album_name: '',
    //     title: '',
    //     artist: '',
    //     time: '',
    //     addedAt: '',
    //     duration: 0
    //   }
    // ]);
    // expect(albums.length).toEqual(1);
  });

  it('check transform method', () => {
    // const pipe = new FilterAlbumNamePipe();
    // const albums = pipe.transform([
    //   {
    //     album: {
    //       album_type: '',
    //       artists: [],
    //       available_markets: [],
    //       external_urls: {
    //         spotify: ''
    //       },
    //       href: '',
    //       id: '',
    //       images: [],
    //       name: 'test',
    //       release_date: '',
    //       release_date_precision: '',
    //       total_track: 0,
    //       type: '',
    //       uri: ''
    //     },
    //     artists: [],
    //     available_markets: [],
    //     disc_number: 0,
    //     duration_ms: 0,
    //     explicit: true,
    //     external_ids: {
    //       isrc: ''
    //     },
    //     external_urls: {
    //       spotify: ''
    //     },
    //     href: '',
    //     id: '',
    //     name: '',
    //     popularity: 0,
    //     preview_url: '',
    //     track_number: 0,
    //     type: '',
    //     uri: '',
    //     isPlayButtonShowing: true,
    //     isPauseButtonShowing: true,
    //     remove: true,
    //     album_name: '',
    //     title: '',
    //     artist: '',
    //     time: '',
    //     addedAt: '',
    //     duration: 0
    //   },
    //   {
    //     album: {
    //       album_type: '',
    //       artists: [],
    //       available_markets: [],
    //       external_urls: {
    //         spotify: ''
    //       },
    //       href: '',
    //       id: '',
    //       images: [],
    //       name: 'lala',
    //       release_date: '',
    //       release_date_precision: '',
    //       total_track: 0,
    //       type: '',
    //       uri: ''
    //     },
    //     artists: [],
    //     available_markets: [],
    //     disc_number: 0,
    //     duration_ms: 0,
    //     explicit: true,
    //     external_ids: {
    //       isrc: ''
    //     },
    //     external_urls: {
    //       spotify: ''
    //     },
    //     href: '',
    //     id: '',
    //     name: '',
    //     popularity: 0,
    //     preview_url: '',
    //     track_number: 0,
    //     type: '',
    //     uri: '',
    //     isPlayButtonShowing: true,
    //     isPauseButtonShowing: true,
    //     remove: true,
    //     album_name: '',
    //     title: '',
    //     artist: '',
    //     time: '',
    //     addedAt: '',
    //     duration: 0
    //   }
    // ], 'tes');
    // expect(albums.length).toEqual(1);
  });
});
