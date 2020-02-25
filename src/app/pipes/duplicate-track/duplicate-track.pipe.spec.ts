// Interfaces
import { SortedTrack } from '@interfaces/track/track.interface';

// Pipes
import { DuplicateTrackPipe } from '@pipes/duplicate-track/duplicate-track.pipe';

describe('DuplicateTrackPipe', () => {
  it('create an instance of duplicate track pipe', () => {
    const pipe = new DuplicateTrackPipe();
    expect(pipe).toBeTruthy();
  });

  it('check transform method with no args', () => {
    const pipe = new DuplicateTrackPipe();
    const tracks = pipe.transform([]);
    expect(tracks.length).toEqual(0);
  });

  it('check transform method with args first items in correct order', () => {
    const pipe = new DuplicateTrackPipe();
    const tracks: SortedTrack[] = pipe.transform([
      {
        title: 'test',
        artist: '',
        album_name: '',
        added_at: '',
        time: 0,
        showPlayButton: false,
        showPauseButton: false,
        duration: 123,
        uri: '',
        total: 0,
        size: 0,
        filterText: '',
        remove: false
      },
      {
        title: 'test',
        artist: '',
        album_name: '',
        added_at: '',
        time: 0,
        showPlayButton: false,
        showPauseButton: false,
        duration: 123,
        uri: '',
        total: 0,
        size: 0,
        filterText: '',
        remove: false
      },
      {
        title: 'test1',
        artist: '',
        album_name: '',
        added_at: '',
        time: 0,
        showPlayButton: false,
        showPauseButton: false,
        duration: 321,
        uri: '',
        total: 0,
        size: 0,
        filterText: '',
        remove: false
      },
      {
        title: 'test1',
        artist: '',
        album_name: '',
        added_at: '',
        time: 0,
        showPlayButton: false,
        showPauseButton: false,
        duration: 321,
        uri: '',
        total: 0,
        size: 0,
        filterText: '',
        remove: false
      }
    ], true);
    expect(tracks.length).toEqual(4);
  });

  it('check transform method with args first items in wrong order', () => {
    const pipe = new DuplicateTrackPipe();
    const tracks: SortedTrack[] = pipe.transform([
      {
        title: 'test1',
        artist: '',
        album_name: '',
        added_at: '',
        time: 0,
        showPlayButton: false,
        showPauseButton: false,
        duration: 123,
        uri: '',
        total: 0,
        size: 0,
        filterText: '',
        remove: false
      },
      {
        title: 'test1',
        artist: '',
        album_name: '',
        added_at: '',
        time: 0,
        showPlayButton: false,
        showPauseButton: false,
        duration: 123,
        uri: '',
        total: 0,
        size: 0,
        filterText: '',
        remove: false
      },
      {
        title: 'test',
        artist: '',
        album_name: '',
        added_at: '',
        time: 0,
        showPlayButton: false,
        showPauseButton: false,
        duration: 321,
        uri: '',
        total: 0,
        size: 0,
        filterText: '',
        remove: false
      },
      {
        title: 'test',
        artist: '',
        album_name: '',
        added_at: '',
        time: 0,
        showPlayButton: false,
        showPauseButton: false,
        duration: 321,
        uri: '',
        total: 0,
        size: 0,
        filterText: '',
        remove: false
      }
    ], true);
    expect(tracks.length).toEqual(4);
  });
});
