// Intefaces
import { AlbumApollo } from '@interfaces/apollo/apollo.inerface';

// Pipes
import { FilterAlbumNamePipe } from '@pipes/filter-album-name/filter-album-name.pipe';

describe('FilterAlbumNamePipe', () => {
  it('create an instance filter album name pipe', () => {
    const pipe = new FilterAlbumNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('check transform method', () => {
    const pipe = new FilterAlbumNamePipe();
    const albums: AlbumApollo[] = pipe.transform([
      {
        artists: [
          {
            name: 'Test'
          }
        ],
        images: [
          {
            url: ''
          }
        ],
        name: 'Test 1'
      }
    ]);
    expect(albums.length).toEqual(1);
  });

  it('check transform method', () => {
    const pipe = new FilterAlbumNamePipe();
    const albums: AlbumApollo[] = pipe.transform([
      {
        artists: [
          {
            name: 'Test'
          }
        ],
        images: [
          {
            url: ''
          }
        ],
        name: 'lalala'
      },
      {
        artists: [
          {
            name: 'Test'
          }
        ],
        images: [
          {
            url: ''
          }
        ],
        name: 'Test 1'
      }
    ], 'tes');
    expect(albums.length).toEqual(1);
  });
});
